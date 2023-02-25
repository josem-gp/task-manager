require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe "Users", type: :request do
  describe "GET /search_tasks" do
    # CALL PARAMS: params[:query]
    # 2xx RESPONSE: {"id": user_id, "tasks": [task_instances]}
    # 4xx RESPONSE: {"id": user_id, "error": "The task you are searching doesn't exist"}
    let(:tasks) { create_list(:task, 3)}
    let(:user) { tasks.first.user }

    before do
      sign_in user
    end

    context "when search param exactly exists in task name or note" do
      get api_v1_search_user_tasks(tasks.first.name)

      expect(response).to have_http_status(:success)
      it "returns a json with the user's tasks that matched the query" do
        json = JSON.parse(response.body)

        expect(json.tasks.length).to eq 1
        expect(json.tasks.first["name"]).to include(tasks.first.name)
      end
    end

    context "when search param partially exists in task name or note" do
      get api_v1_search_user_tasks("Task")

      expect(response).to have_http_status(:success)
      it "returns a json with the user's tasks that matched the query" do
        json = JSON.parse(response.body)
        
        expect(json.tasks.length).to eq 3
      end
    end

    context "when search param doesn't exist in task name or note" do
      get api_v1_search_user_tasks("rand")

      expect(response).to have_http_status(:error)
      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json.error).to eq("The task you are searching doesn't exist")
      end
    end
  end

  describe "PATCH /update" do
    # CALL PARAMS: {"icon": {"id": new_icon_id}}
    # 2xx RESPONSE: {"id": user_id, "data": {"username": ....}}
    # 4xx RESPONSE: {"id": user_id, "error": "The user's icon couldn't be updated"}

    let(:user) { create :user }
    let(:new_icon) { create :icon }

    before do
      sign_in user
      headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    end

    context "with valid parameters" do
      expect{
        patch api_v1_user, 
        params: "{ 'icon': { 'id': #{new_icon.id} } }".to_json, 
        headers: auth_headers
      }.to have_http_status(:success)

      it "updates the user icon" do
        expect(user.icon.id).to eq(new_icon.id)
      end
  
      it "returns a json with the updated user info" do
        json = JSON.parse(response.body)

        expect(json.data.keys).to contain_exactly('id', 'username', 'email', 'icon_id')
        expect(json.data.id).to eq(user.id)
        expect(json.data.new_icon).to eq(new_icon.id)
      end
    end

    context "with invalid parameters" do
      expect{
        patch api_v1_user, 
        params: '{ "icon": { "id": 100 } }', 
        headers: auth_headers
      }.to have_http_status(:error)

      it "does not update the user icon" do
        expect(user.icon.id).to_not eq(new_icon.id)
      end
  
      it "returns a json with an error message" do
        json = JSON.parse(response.body)
  
        expect(json.error).to eq("The user's icon couldn't be updated")
      end
    end
  end
end
