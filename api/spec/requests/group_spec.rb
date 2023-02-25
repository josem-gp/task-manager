require 'rails_helper'

RSpec.describe "Groups", type: :request do
  let(:user) { create :user }

  describe "GET /index" do
    before do
      sign_in user
      get api_v1_groups_path
    end

    it "returns a json with the groups of the user" do
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)

      puts "JSON: #{json}"
    end

    it "returns a json with the groups of the user" do
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)

      puts "JSON: #{json}"
    end
  end

  # describe "GET /show" do
  #   expect(response).to have_http_status(:success)
  #   it "returns a json with a specific group of the user" do
  #   end
  # end

  # describe "POST /create" do
  #   context "with valid parameters" do
  #     expect(response).to have_http_status(:success)
  #     it "creates the group" do
  #        # Here we check the creation happened
  #     end

  #     it "returns a json with the info of the new group" do
  #     end

  #     it "has the user set as the admin" do
  #     end
  #   end

  #   context "with invalid parameters" do
  #     expect(response).to have_http_status(:error)
  #     it "does not create the group" do
  #     end

  #     it "returns a json with an error message" do
  #     end
  #   end
  # end

  # describe "PATCH /update" do
  #   context "when user is admin" do
  #     context "with valid parameters" do
  #       expect(response).to have_http_status(:success)
  #       it "updates the group" do
  #       end

  #       it "returns a json with the info of the new group" do
  #       end
  #     end

  #     context "with invalid parameters" do
  #       expect(response).to have_http_status(:error)
  #       it "does not create the group" do
  #       end

  #       it "returns a json with an error message" do
  #       end
  #     end
  #   end

  #   context "when user is not admin" do
  #     expect(response).to have_http_status(:error)
  #     it "does not create the group" do
  #     end

  #     it "returns a json with an error message" do
  #     end
  #   end
  # end

  # describe "DELETE /destroy" do
  #   context "when user is admin" do
  #     expect(response).to have_http_status(:success)
  #     it "deletes the group" do
  #       # Memberships, tags, tasks, taggedtasks, invitations
  #     end

  #     it "deletes the group's dependent associations" do
  #     end

  #     it "returns a json with updated info of user groups" do
  #     end
  #   end

  #   context "when user is not admin" do
  #     expect(response).to have_http_status(:error)
  #     it "does not delete the group" do
  #     end

  #     it "does not delete the group's dependent associations" do
  #     end

  #     it "returns a json with an error message" do
  #     end
  #   end
  # end

  # describe "GET /filter_tasks" do
  #   let(:tasks) { create_list(:task, 3)}

  #   sign_in user
  #   context "when filter param is empty" do
  #     # params[:query] -> {name: "", assignee: "", finished: "true or false", due_date: ""}
  #     get filter_tasks_api_v1_user(group.id)

  #     expect(response).to have_http_status(:success)
  #     it "returns an array of all tasks for that group" do
  #       json = JSON.parse(response.body)
  #       # {id: group_id, tasks: [task_instances]}

  #     end
  #   end

  #   context "when filter param has only one param" do
  #     it "returns an array the tasks that fit the search in the group" do

  #     end
  #   end

  #   context "when filter param has more than one param" do
  #     it "returns an array the tasks that fit the search in the group" do
 
  #     end
  #   end
  # end

  # describe "POST /send_invitation" do
  #   context "when user is admin" do
  #     expect(response).to have_http_status(:success)
  #     it "enqueues an invitation" do
  #     end

  #     it "returns a json with a success message" do
  #     end
  #   end

  #   context "when user is not admin" do
  #     expect(response).to have_http_status(:error)
  #     it "does not enqueue any invitation" do
  #     end

  #     it "returns a json with an error message" do
  #     end
  #   end
  # end

  # describe "GET /fetch_group_users" do
  #   expect(response).to have_http_status(:success)
  #   it "returns a json with the users in the group" do
  #   end
  # end

  # describe "DELETE /remove_user" do
  #   context "when user is admin" do
  #     expect(response).to have_http_status(:success)
  #     it "deletes the user" do
  #     end

  #     it "changes the ownership of user's tasks to group admin" do
  #     end

  #     it "changes the ownership of user's tags to group admin" do
  #     end

  #     it "returns a json with the updated list of users in the group" do
  #     end
  #   end

  #   context "when user is not admin" do
  #     expect(response).to have_http_status(:error)
  #     it "does not delete the user" do
  #     end

  #     it "returns a json with an error message" do
  #     end
  #   end
  # end
end
