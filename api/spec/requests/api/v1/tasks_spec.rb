require 'rails_helper'

RSpec.describe "Api::V1::Tasks", type: :request do
  let(:group) { create :group }
  let(:user) { create :user }
  let(:tags) { create_list :tag, 3, group: group }
  let!(:task) { create :task, user: user, group: group, assignee: group.admin }

  before do 
    create :membership, user: user, group: group
    create :tagged_task, task: task, tag: tags.first
  end

  describe "GET /show" do
    # 2xx RESPONSE: {"task_value": { "task": task_instance, "task_tags": [task_instance.tags] } }
    before do
      sign_in user
      get api_v1_task_path(task.id)
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with a specific task of the user" do
      json = JSON.parse(response.body)

      expect(json["task_value"]["task"]["name"]).to eq(task.name)
    end

    it "returns a json with all the tags of that task" do
      json = JSON.parse(response.body)

      expect(json["task_value"]["task_tags"].first["name"]).to eq(tags.first.name)
    end
  end

  describe "POST /create" do
    # 2xx RESPONSE: { task_value: { task: task_instance, task_tags: task_instance.tags }, message: "The task was successfully created" }
    # 4xx RESPONSE: {"message": error_message}
    before do
      sign_in user
      post api_v1_tasks_path, 
      params: params
    end

    context "with valid parameters" do
      context "without tags params" do 
        let(:params) { { "task": { 
          "name": "Spec Task", 
          "note": "This is a note", 
          "due_date": "2050-12-10", 
          "group_id": group.id, 
          "tag_ids": [] } 
        } }

        it { expect(response).to have_http_status(:success) }

        it "creates the task" do
          expect(Task.find_by(name: "Spec Task")).to be_present
        end

        it "does not create any tagged task" do
          task = Task.find_by(name: "Spec Task")
          expect(TaggedTask.where(task: task).count).to eq 0
        end

        it "returns a json with the updated info of the user tasks in the group" do
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
          "group_id": group.id, 
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
        let(:params) { { "task": { 
          "name": "Spec Task", 
          "note": "This is a note", 
          "due_date": "", 
          "group_id": group.id,
          "tag_ids": [] } 
        } }

        it { expect(response).to have_http_status(400) }

        it "does not create the task" do
          expect(Task.find_by(name: "Spec Task")).to_not be_present
        end

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to match("Due date can't be blank")
        end
      end

      context "without group params" do # it doesn't pass the Pundit filtering
        let(:params) { { "task": { 
          "name": "Spec Task", 
          "note": "This is a note", 
          "due_date": "2050-12-10" } 
        } }

        it { expect(response).to have_http_status(401) }

        it "does not create the task" do
          expect(Task.find_by(name: "Spec Task")).to_not be_present
        end

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to eq("Unauthorized access or action")
        end
      end

      context "with wrong tags params" do 
        let(:params) { { "task": { 
          "name": "Spec Task", 
          "note": "This is a note", 
          "due_date": "2050-12-10", 
          "group_id": group.id, 
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

  describe "PATCH /update" do
    # 2xx RESPONSE: { task_value: { task: task_instance, task_tags: task_instance.tags }, message: "The task was successfully updated" }
    # 4xx RESPONSE: { "message": error_message }
    before do
      sign_in user
      patch api_v1_task_path(task.id), 
      params: params
    end

    context "with valid parameters" do
      let(:params) { { "task": { "name": "Spec Task 2", "tag_ids": [tags.last.id] } } }

      it { expect(response).to have_http_status(:success) }

      it "updates the task" do
        task.reload
        expect(task.name).to eq("Spec Task 2")
        expect(task.tags.count).to eq 1
        expect(task.tags.first.name).to eq(tags.last.name)
      end

      it "returns a json with the updated info of the task" do
        json = JSON.parse(response.body)

        expect(json["task_value"]["task"]["name"]).to eq("Spec Task 2")
        expect(json["message"]).to eq("The task was successfully updated")
      end

      it "returns a json with the updated info of the task tags" do
        json = JSON.parse(response.body)

        expect(json["task_value"]["task_tags"].count).to eq 1
        expect(json["task_value"]["task_tags"].first["name"]).to eq(tags.last.name)         
      end
    end

    context "with invalid parameters" do
      let(:params) { { "task": { "note": "This is a note", "due_date": "" } } }

      it { expect(response).to have_http_status(400) }

      it "does not update the task" do
        task.reload
        expect(task.note).to_not eq("This is a note")
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Due date can't be blank")
      end
    end
  end

  describe "DELETE /destroy" do
    # 2xx RESPONSE: {"message": "The task was successfully deleted"}
    # 4xx RESPONSE: {"message": "The task couldn't be deleted"}
    before do
      sign_in user
      delete api_v1_task_path(param)
    end

    context "with valid params" do
      let(:param) {task.id}

      it { expect(response).to have_http_status(:success) }

      it { expect{ task.reload }.to raise_error(ActiveRecord::RecordNotFound) }

      it { expect(TaggedTask.where(task: task).count).to eq 0 }

      it "returns a json with updated info of user tasks" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("The task was successfully deleted")
      end
    end

    context "with invalid params" do
      let(:param) {1234}

      it { expect(response).to have_http_status(404) }

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Record not found")
      end
    end
  end
end
