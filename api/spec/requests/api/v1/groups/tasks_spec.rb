require 'rails_helper'

# To test when actions come from a specific group
RSpec.describe "Api::V1::Groups::Tasks", type: :request do
  let(:group) { create :group }
  let(:user) { create :user }
  let(:tags) { create_list :tag, 3, group: group }
  let!(:group_task) { create :task, user: user, group: group, assignee: nil }
  before do
    create :membership, user: user, group: group
    create :tagged_task, task: group_task, tag: tags.first
    create :task, user: user # This task should never appear since it is not in the group we are doing the specs into
  end

  describe "GET /index" do
    # 2xx RESPONSE:  { "task_value": [{ "task": task_instance, "task_tags": [task_instance.tags] }, {...}] }
    before do
      sign_in user
      get api_v1_group_tasks_path(group.id)
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with the tasks of the user for that group" do
      json = JSON.parse(response.body)

      expect(json["task_value"].length).to eq 1
      expect(json["task_value"].first["task"]["name"]).to eq(group_task.name)
    end

    it "returns a json with all the tags of each task" do
      json = JSON.parse(response.body)

      expect(json["task_value"].first["task_tags"].count).to eq 1
      expect(json["task_value"].first["task_tags"].first["name"]).to eq(tags.first.name)
    end
  end

  describe "POST /create" do
    # 2xx RESPONSE: {"task": task_instance, "message": "The task was successfully created"}
    # 4xx RESPONSE: {"message": error_message}
    before do
      sign_in user
      post api_v1_group_tasks_path(group.id), 
      params: params
    end

    context "with valid parameters" do
      context "without tags params" do
        let(:params) { { "task": { 
          "name": "Spec Task", 
          "note": "This is a note", 
          "due_date": "10-12-2050",
          "tag_ids": [] } 
        } }

        it { expect(response).to have_http_status(:success) }

        it "creates the task for that group" do
          expect(Task.find_by(name: "Spec Task")).to be_present
        end

        it "does not create any tagged task" do
          task = Task.find_by(name: "Spec Task")
          expect(TaggedTask.where(task: task).count).to eq 0
        end

        it "returns a json with the updated info of the user tasks" do
          json = JSON.parse(response.body)

          expect(json["task_value"]["task"]["name"]).to eq("Spec Task")
          expect(json["message"]).to eq("The task was successfully created")
        end

        it "returns a json with an empty array of task tags" do
          json = JSON.parse(response.body)

          expect(json["task_value"]["task_tags"]).to match_array([])
        end
      end

      context "with tags params" do 
        let(:params) { { "task": {
          "name": "Spec Task",
          "note": "This is a note",
          "due_date": "2050-12-10",
          "tag_ids": [tags[1].id, tags.last.id] } 
        } }

        it { expect(response).to have_http_status(:success) }

        it "creates the task" do
          expect(Task.find_by(name: "Spec Task")).to be_present
        end

        it "creates tagged tasks" do
          task = Task.find_by(name: "Spec Task")
          expect(TaggedTask.where(task: task).count).to eq 2
        end

        it "returns a json with the updated info of the user tasks in the group" do
          json = JSON.parse(response.body)

          expect(json["task_value"]["task"]["name"]).to eq("Spec Task")
          expect(json["message"]).to eq("The task was successfully created")
        end

        it "returns a json with the info of the task tags" do
          json = JSON.parse(response.body)

          expect(json["task_value"]["task_tags"].count).to eq 2
        end
      end
    end

    context "with invalid parameters" do
      context "without needed params" do
        let(:params) { { "task": { "note": "This is a note", "due_date": "10-12-2050" } } }

        it { expect(response).to have_http_status(400) }

        it "does not create the task" do
          expect(Task.find_by(name: "Spec Task")).to_not be_present
        end

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to eq("Name can't be blank")
        end
      end

      context "with wrong tags params" do 
        let(:params) { { "task": { 
          "name": "Spec Task", 
          "note": "This is a note", 
          "due_date": "2050-12-10", 
          "tag_ids": [tags[1].id, "ab"] } 
        } }

        it { expect(response).to have_http_status(:success) }

        it "creates the task" do
          expect(Task.find_by(name: "Spec Task")).to be_present
        end

        it "returns a json with the updated info of the user tasks in the group" do
          json = JSON.parse(response.body)

          expect(json["task_value"]["task"]["name"]).to eq("Spec Task")
          expect(json["message"]).to eq("The task was successfully created")
        end

        it "returns a json with the info of the task tags" do
          json = JSON.parse(response.body)

          expect(json["task_value"]["task_tags"].count).to eq 1          
        end
      end
    end
  end
end