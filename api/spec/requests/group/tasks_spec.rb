require 'rails_helper'

# To test when actions come from a specific group
RSpec.describe "Group::Tasks", type: :request do
  let(:group) { create :group }
  let(:user) { create :user }
  let!(:membership) {create :membership, user: user, group: group}
  let(:group_task) { create :task, user: user, group: group }
  let(:task) { create :task, user: user }

  # describe "GET /index" do
  #   # 2xx RESPONSE: {"id": group_id, "tags": [tag_instances]}
  #   before do
  #     sign_in user
  #     get api_v1_group_tasks_path(group.id)
  #   end

  #   it { expect(response).to have_http_status(:success) }

  #   it "returns a json with the tasks of the user for that group" do
  #     json = JSON.parse(response.body)

  #     expect(json.task.length).to eq 1
  #   end
  # end

  # describe "POST /create" do
  #   # CALL PARAMS: {"task": {"name": ...}}
  #   # 2xx RESPONSE: {"id": group_id, "task": task_instance, "message": "The task was successfully created"}
  #   # 4xx RESPONSE: {"id": group_id, "message": "The task couldn't be created"}
  #   before do
  #     sign_in user
  #     headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
  #     auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
  #   end


  #   context "with valid parameters" do
  #     before do
  #       post api_v1_group_tasks_path(group.id), 
  #       params: '{ "task": { "name": "Spec Task", "note": "This is a note", "due_date": "10-12-2050" } }', 
  #       headers: auth_headers
  #     end

  #     it { expect(response).to have_http_status(:success) }

  #     it "creates the task for that group" do
  #       expect(Task.find_by(name: "Spec Task")).to be_present
  #     end

  #     it "returns a json with the updated info of the user tasks" do
  #       json = JSON.parse(response.body)

  #       expect(json.task.keys).to contain_exactly('id', 'name', 'note', 'due_date', 'finished', 'user_id', 'group_id', 'assignee_id')
  #       expect(json.task.name).to eq("Spec Task")
  #       expect(json.message).to eq("The task was successfully created")
  #     end
  #   end

  #   context "with invalid parameters" do
  #     before do
  #       post api_v1_group_tasks_path(group.id), 
  #       params: '{ "task": { "note": "This is a note", "due_date": "10-12-2050" } }', 
  #       headers: auth_headers
  #     end

  #     it { expect(response).to have_http_status(:error) }

  #     it "does not create the task" do
  #       expect(Task.find_by(name: "Spec Task")).to_not be_present
  #     end

  #     it "returns a json with an error message" do
  #       json = JSON.parse(response.body)

  #       expect(json.message).to eq("The task couldn't be created")
  #     end
  #   end
  # end
end