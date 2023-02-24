require 'rails_helper'

RSpec.describe "Invitations", type: :request do
  describe "GET /index" do
    context "when user is admin" do
      expect(response).to have_http_status(:success)
      it "returns a json with the invitations for the group" do
      end
    end

    context "when user is not admin" do
      expect(response).to have_http_status(:error)
      it "returns a json with an error message" do
      end
    end
  end

  describe "GET /invitation_signup" do
    context "when invitation has been disabled" do
      expect(response).to have_http_status(:error)
      it "returns a json with an error message" do
      end
    end

    context "when invitation not disabled" do
      context "when expiration date has already passed" do
        expect(response).to have_http_status(:error)
        it "returns a json with an error message" do
        end
      end

      context "when expiration date has still not passed" do
        expect(response).to have_http_status(:success)
        it "disables the invitation" do
        end

        it "redirects invitee to sign up page with group_id set" do
        end
      end
    end
  end
end
