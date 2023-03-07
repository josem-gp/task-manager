require 'rails_helper'

# To test when actions come from a specific group
RSpec.describe "Api::V1::Groups::Tasks", type: :request do
  let(:group) { create :group }
  let(:user) { create :user }
  let!(:membership) {create :membership, user: user, group: group}
  let!(:group_task) { create :task, user: user, group: group }
  before do
    create :task, user: user # This task should never appear since it is not in the group we are doing the specs into
  end

  describe "GET /index" do
    # 2xx RESPONSE: {"tasks": [task_instances]}
    before do
      sign_in user
      get api_v1_group_tasks_path(group.id)
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with the tasks of the user for that group" do
      json = JSON.parse(response.body)

      expect(json["tasks"].length).to eq 1
      expect(json["tasks"].first["name"]).to eq(group_task.name)
    end
  end

  describe "POST /create" do
    # 2xx RESPONSE: {"task": task_instance, "message": "The task was successfully created"}
    # 4xx RESPONSE: {"message": error_message}
    before do
      sign_in user
    end

    context "with valid parameters" do
      before do
        post api_v1_group_tasks_path(group.id), 
        params: { "task": { "name": "Spec Task", "note": "This is a note", "due_date": "10-12-2050" } } 
      end

      it { expect(response).to have_http_status(:success) }

      it "creates the task for that group" do
        expect(Task.find_by(name: "Spec Task")).to be_present
      end

      it "returns a json with the updated info of the user tasks" do
        json = JSON.parse(response.body)

        expect(json["task"]["name"]).to eq("Spec Task")
        expect(json["message"]).to eq("The task was successfully created")
      end
    end

    context "with invalid parameters" do
      before do
        post api_v1_group_tasks_path(group.id), 
        params: { "task": { "note": "This is a note", "due_date": "10-12-2050" } }
      end

      it { expect(response).to have_http_status(400) }

      it "does not create the task" do
        expect(Task.find_by(name: "Spec Task")).to_not be_present
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Name can't be blank")
      end
    end
  end
end