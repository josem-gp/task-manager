require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "PATCH /update" do
    # 2xx RESPONSE: {"user": user_instance, "message": "The user was successfully updated"}
    # 4xx RESPONSE: {"message": error_message}
    let(:user) { create :user }
    let(:new_icon) { create :icon }

    before do
      sign_in user

      patch api_v1_user_path(user.id), 
      params: params 
    end

    context "with valid parameters" do
      let(:params) { { "user": { "icon_id": new_icon.id, "username": "new username" } } }

      it { expect(response).to have_http_status(:success) }

      it "updates the user icon" do
        user.reload
        expect(user.icon.id).to eq(new_icon.id)
      end

      it "updates the user username" do
        user.reload
        expect(user.username).to eq("new username")
      end
  
      it "returns a json with the updated user info" do
        json = JSON.parse(response.body)

        expect(json["user"]["icon_id"]).to eq(new_icon.id)
        expect(json["message"]).to eq("The user was successfully updated")
      end
    end

    context "with invalid parameters" do
      let(:params) { { "user": { "icon_id": 10000 } } }
      
      it { expect(response).to have_http_status(400) }

      it "does not update the user icon" do
        user.reload
        expect(user.icon.id).to_not eq(new_icon.id)
      end
  
      it "returns a json with an error message" do
        json = JSON.parse(response.body)
  
        expect(json["message"]).to eq("Icon must exist")
      end
    end
  end
end
