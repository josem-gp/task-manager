require 'rails_helper'

RSpec.describe "Invitations", type: :request do
  # describe "GET /index" do
  #   # PARAMS: params[:group_id]
  #   # 2xx RESPONSE: {"id": group_id, "invitations": [invitation_instances]}
  #   let(:group) { create :group }
  #   let(:user) { create :user }

  #   before do
  #     sign_in user
  #     get api_v1_group_invitation_path(group.id)
  #   end

  #   it { expect(response).to have_http_status(:success) }

  #   it "returns a json with the invitations in the groups" do
  #     json = JSON.parse(response.body)

  #     expect(json.invitations.length).to eq 1
  #   end
  # end

  # describe "GET /invitation_signup" do
  #   # PARAMS: params[:group_id]
  #   # 4xx RESPONSE: {"id": invitation_id, "message": "The invitation has expired already"}
  #   let(:invitation) {create :invitation}

  #   context "when invitation has been disabled" do
  #     before do
  #       invitation.disabled = true
  #       invitation.save
  #     end

  #     expect {
  #       get api_v1_path(invitation.oauth_token)
  #     }.to have_http_status(:error)

  #     it "returns a json with an error message" do
  #       json = JSON.parse(response.body)

  #       expect(json.message).to eq("The invitation has expired already")
  #     end
  #   end

  #   context "when invitation not disabled" do
  #     context "when expiration date has already passed" do
  #       before do
  #         invitation.expiration_date = DateTime.now - 8
  #         invitation.save
  #       end
  
  #       expect {
  #         get api_v1_path(invitation.oauth_token)
  #       }.to have_http_status(:error)

  #       it "returns a json with an error message" do
  #         json = JSON.parse(response.body)

  #         expect(json.message).to eq("The invitation has expired already")
  #       end
  #     end

  #     context "when expiration date has still not passed" do
  #       expect {
  #         get api_v1_path(invitation.oauth_token)
  #       }.to have_http_status(:success)

  #       it "disables the invitation" do
  #         expect(invitation.disabled).to be true
  #       end

  #       it "redirects invitee to sign up page with group_id set" do
  #         expect(session[:group]).to eq(invitation.group)
  #         expect(response).to redirect_to(user_session_path)
  #       end
  #     end
  #   end
  # end
end
