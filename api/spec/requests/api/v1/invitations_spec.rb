require 'rails_helper'

RSpec.describe "Api::V1::Invitations", type: :request do
  describe "GET /invitation_signup" do
    # PARAMS: params[:group_id]
    # 4xx RESPONSE: {"id": invitation_id, "message": "The invitation has expired already"}
    let(:invitation) {create :invitation}
    before do
      prev_action
      get api_v1_path(invitation.oauth_token)
    end

    context "when invitation has been disabled" do
      let(:prev_action) do
        invitation.disabled = true
        invitation.save  
      end

      it { expect(response).to have_http_status(:redirect) }

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("The invitation has expired already")
      end
    end

    context "when invitation not disabled" do
      context "when expiration date has already passed" do
        let(:prev_action) do
          invitation.expiration_date = DateTime.now - 8
          invitation.save
        end
  
        it { expect(response).to have_http_status(:redirect) }

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to eq("The invitation has expired already")
        end
      end

      context "when expiration date has still not passed" do
        let(:prev_action) {nil}

        it { expect(response).to have_http_status(:redirect) }

        it "disables the invitation" do
          invitation.reload
          expect(invitation.disabled).to be true
        end

        it "stores group_id in user session" do
          expect(session[:group]).to eq(invitation.group.id)
        end

        it "redirects invitee to sign up page with email set" do
          redirect_params = Rack::Utils.parse_query(URI.parse(response.location).query)
          
          expect(response).to redirect_to("http://localhost:3001/sign_up?email=#{CGI.escape(invitation.email)}")
        end
      end
    end
  end
end
