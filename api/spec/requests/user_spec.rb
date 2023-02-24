require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe "Users", type: :request do
  describe "GET /search_tasks" do
    let(:tasks) { create_list(:task, 3)}
    let(:user) { tasks.first.user }

    sign_in user

    context "when search param exactly exists in task name or note" do
      # params[:query] -> string
      get search_tasks_api_v1_user(user.id, tasks.first)

      expect(response).to have_http_status(:success)
      it "returns a json with the tasks for that user" do
        json = JSON.parse(response.body)
        # {'id': user_id, 'tasks': [task_instances]}
        expect(json.tasks.length).to eq 1
        expect(json.tasks.first["name"]).to include(tasks.first.name)
      end
    end

    context "when search param partially exists in task name or note" do
      # params[:query] -> string
      get search_tasks_api_v1_user(user.id, "Task")

      expect(response).to have_http_status(:success)
      it "returns a json with the tasks for that user" do
        json = JSON.parse(response.body)
        # {'id': user_id, 'tasks': [task_instances]}
        expect(json.tasks.length).to eq 3
      end
    end

    context "when search param doesn't exist in task name or note" do
      # params[:query] -> string
      get search_tasks_api_v1_user(user.id, "rand")

      expect(response).to have_http_status(:error)
      it "returns a json with an error message" do
        json = JSON.parse(response.body)
        # {'id': user_id, 'error': "The task you are searching doesn't exist"}
        expect(json.error).to eq("The task you are searching doesn't exist")
      end
    end

    context "when there are different users in the group" do
      expect(response).to have_http_status(:success)
      it "returns a json with only the tasks of the current user" do
      end
    end

    context "when the current user belongs to different groups" do
      expect(response).to have_http_status(:success)
      it "returns a json with all the tasks of the current user" do
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      expect(response).to have_http_status(:success)
      it "updates the user icon" do
        # Here we check the update happened
      end
  
      it "returns a json with the updated user info" do
        # {'id': user_id, 'data': {'username': ....}}
  
      end
    end

    context "with invalid parameters" do
      expect(response).to have_http_status(:error)
      it "does not update the user icon" do
      end
  
      it "returns a json with an error message" do
        # {'id': user_id, 'error': "The task you are searching doesn't exist"}
  
      end
    end
  end
end
