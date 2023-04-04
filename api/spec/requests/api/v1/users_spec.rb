require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  let(:user) { create :user }
  before do
    sign_in user
  end

  # 2xx RESPONSE: {"user": user_instance, "message": "The user was successfully updated"}
  # 4xx RESPONSE: {"message": error_message}
  describe "PATCH /update" do
    let(:new_icon) { create :icon }

    before do
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

        expect(json["user"]).to have_key("id").and(have_key("username")).and(have_key("email")).and(have_key("icon_id"))
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

  # 2xx RESPONSE: { "user": user_instance, "userGroups": [user_groups], "userTasks": [user_tasks]}
  describe "GET /fetch_user_info" do
    before do
      create_list(:group, 3, admin: user)
      get api_v1_users_fetch_user_info_path
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with the info of the users" do
      json = JSON.parse(response.body)

      expect(json).to have_key("user").and(have_key("userGroups")).and(have_key("userTasks"))
      expect(json["user"]["id"]).to eq user.id
      expect(json["userGroups"].length).to eq 3
      expect(json["userTasks"].length).to eq 9
    end
  end
end
