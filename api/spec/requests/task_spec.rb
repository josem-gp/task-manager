require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  # This creates a group with an admin on one side (and all associations in the Factory model) 
  # and also a user that is then added to the group
  let(:group) { create :group }
  let(:user) { create :user }
  let!(:membership) {create :membership, user: user, group: group}
  # This generates two type of tasks: one part of the group we will be using for the specs and another one part of another group
  let(:group_task) { create :task, user: user, group: group }
  let(:task) { create :task, user: user }

  # describe "GET /index" do
  #   # 2xx RESPONSE: {"id": group_id, "tags": [tag_instances]}
  #   context "when done from a specific group" do
  #     before do
  #       sign_in user
  #       get api_v1_group_tasks_path(group.id)
  #     end

  #     it { expect(response).to have_http_status(:success) }

  #     it "returns a json with the tasks of the user for that group" do
  #       json = JSON.parse(response.body)

  #       expect(json.task.length).to eq 1
  #     end
  #   end

  #   context "when done from the user dashboard" do
  #     before do
  #       sign_in user
  #       get api_v1_tasks_path
  #     end

  #     it { expect(response).to have_http_status(:success) }

  #     it "returns a json with all the tasks of the user" do
  #       json = JSON.parse(response.body)

  #       expect(json.tasks.length).to eq 2
  #     end
  #   end
  # end

  # describe "GET /show" do
  #   # PARAMS: params[:id]
  #   # 2xx RESPONSE: {"id": group_id, "task": task_instance}
  #   before do
  #     sign_in user
  #     get api_v1_task_path(task.id)
  #   end

  #   it { expect(response).to have_http_status(:success) }

  #   it "returns a json with a specific task of the user" do
  #     json = JSON.parse(response.body)

  #     expect(json.task.keys).to contain_exactly('id', 'name', 'note', 'due_date', 'finished', 'user_id', 'group_id', 'assignee_id')
  #     expect(json.task.name).to eq(task.name)
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

  #   context "when done from a specific group" do
  #     context "with valid parameters" do
  #       before do
  #         post api_v1_group_tasks_path(group.id), 
  #         params: '{ "task": { "name": "Spec Task", "note": "This is a note", "due_date": "10-12-2050" } }', 
  #         headers: auth_headers
  #       end

  #       it { expect(response).to have_http_status(:success) }

  #       it "creates the task for that group" do
  #         expect(Task.find_by(name: "Spec Task")).to be_present
  #       end
  
  #       it "returns a json with the updated info of the user tasks" do
  #         json = JSON.parse(response.body)

  #         expect(json.task.keys).to contain_exactly('id', 'name', 'note', 'due_date', 'finished', 'user_id', 'group_id', 'assignee_id')
  #         expect(json.task.name).to eq("Spec Task")
  #         expect(json.message).to eq("The task was successfully created")
  #       end
  #     end
  
  #     context "with invalid parameters" do
  #       before do
  #         post api_v1_group_tasks_path(group.id), 
  #         params: '{ "task": { "note": "This is a note", "due_date": "10-12-2050" } }', 
  #         headers: auth_headers
  #       end

  #       it { expect(response).to have_http_status(:error) }

  #       it "does not create the task" do
  #         expect(Task.find_by(name: "Spec Task")).to_not be_present
  #       end
  
  #       it "returns a json with an error message" do
  #         json = JSON.parse(response.body)

  #         expect(json.message).to eq("The task couldn't be created")
  #       end
  #     end
  #   end

  #   context "when done from the user dashboard" do
  #     context "with valid parameters" do
  #       before do
  #         post api_v1_tasks_path, 
  #         params: "{ 'task': { 'name': 'Spec Task', 'note': 'This is a note', 'due_date': '10-12-2050', 'group_id': #{group.id} } }".to_json, 
  #         headers: auth_headers
  #       end

  #       it { expect(response).to have_http_status(:success) }

  #       it "creates the task" do
  #         expect(Task.find_by(name: "Spec Task")).to be_present
  #       end
  
  #       it "returns a json with the updated info of the user tasks in the group" do
  #         json = JSON.parse(response.body)

  #         expect(json.task.keys).to contain_exactly('id', 'name', 'note', 'due_date', 'finished', 'user_id', 'group_id', 'assignee_id')
  #         expect(json.task.name).to eq("Spec Task")
  #         expect(json.message).to eq("The task was successfully created")
  #       end
  #     end
  
  #     context "with invalid parameters" do
  #       before do
  #         post api_v1_tasks_path, 
  #         params: '{ "task": { "name": "Spec Task", "note": "This is a note", "due_date": "10-12-2050" } }', 
  #         headers: auth_headers
  #       end

  #       it { expect(response).to have_http_status(:error) }

  #       it "does not create the task" do
  #         expect(Task.find_by(name: "Spec Task")).to_not be_present
  #       end
  
  #       it "returns a json with an error message" do
  #         json = JSON.parse(response.body)

  #         expect(json.message).to eq("The task couldn't be created")
  #       end
  #     end
  #   end
  #   end
  # end

  # describe "PATCH /update" do
  #   # CALL PARAMS: {"task": {"name": ...}}
  #   # 2xx RESPONSE: {"id": group_id, "task": task_instance, "message": "The task was successfully updated"}
  #   # 4xx RESPONSE: {"id": group_id, "message": "The task couldn't be updated"}
  #   before do
  #     sign_in user
  #     headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
  #     auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
  #   end

  #   context "with valid parameters" do
  #     before do
  #       post api_v1_task_path(task.id), 
  #       params: '{ "task": { "name": "Spec Task 2" } }', 
  #       headers: auth_headers
  #     end

  #     it { expect(response).to have_http_status(:success) }

  #     it "updates the task" do
  #       expect(task.name).to eq("Spec Task 2")
  #     end

  #     it "returns a json with the updated info of the user tasks" do
  #       json = JSON.parse(response.body)

  #       expect(json.task.keys).to contain_exactly('id', 'name', 'note', 'due_date', 'finished', 'user_id', 'group_id', 'assignee_id')
  #       expect(json.task.name).to eq("Spec Task 2")
  #       expect(json.message).to eq("The task was successfully updated")
  #     end
  #   end

  #   context "with invalid parameters" do
  #     before do
  #       post api_v1_task_path(task.id), 
  #       params: '{ "task": { "note": "This is a note", "due_date": "10-12-2050" } }', 
  #       headers: auth_headers
  #     end

  #     it { expect(response).to have_http_status(:error) }

  #     it "does not update the task" do
  #       expect(task.note).to_not eq("This is a note")
  #     end

  #     it "returns a json with an error message" do
  #       json = JSON.parse(response.body)

  #       expect(json.message).to eq("The task couldn't be updated")
  #     end
  #   end
  # end

  # describe "DELETE /destroy" do
  #   # CALL PARAMS: {"tag": {"group_id": ..., "tag_id": ...}}
  #   # 2xx RESPONSE: {"id": group_id, "message": "The tag was successfully deleted"}
  #   before do
  #     sign_in user
  #     delete api_v1_tas_path(task.id)
  #   end

  #   it { expect(response).to have_http_status(:success) }

  #   it "deletes the task" do
  #     expect(Task.find(task.id)).to_not be_present
  #   end

  #   it "returns a json with updated info of user tasks" do
  #     json = JSON.parse(response.body)

  #     expect(json.message).to eq("The tag was successfully deleted")
  #   end
  # end
end
