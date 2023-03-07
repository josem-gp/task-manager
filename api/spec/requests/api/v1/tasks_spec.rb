require 'rails_helper'

RSpec.describe "Api::V1::Tasks", type: :request do
  let(:group) { create :group }
  let(:user) { create :user }
  let!(:membership) {create :membership, user: user, group: group}
  let!(:task) { create :task, user: user, group: group }

  describe "GET /index" do
    # 2xx RESPONSE: {"tasks": [task_instances]}
    before do
      sign_in user
      get api_v1_tasks_path
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with all the tasks of the user" do
      json = JSON.parse(response.body)

      expect(json["tasks"].length).to eq 1
      expect(json["tasks"].first["name"]).to eq(task.name)
    end
  end

  describe "GET /show" do
    # 2xx RESPONSE: {"task": task_instance}
    before do
      sign_in user
      get api_v1_task_path(task.id)
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with a specific task of the user" do
      json = JSON.parse(response.body)

      expect(json["task"]["name"]).to eq(task.name)
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
        post api_v1_tasks_path, 
        params: { "task": { "name": "Spec Task", "note": "This is a note", "due_date": "2050-12-10", "group_id": group.id } }
      end

      it { expect(response).to have_http_status(:success) }

      it "creates the task" do
        expect(Task.find_by(name: "Spec Task")).to be_present
      end

      it "returns a json with the updated info of the user tasks in the group" do
        json = JSON.parse(response.body)

        expect(json["task"]["name"]).to eq("Spec Task")
        expect(json["message"]).to eq("The task was successfully created")
      end
    end

    context "with invalid parameters" do
      context "without needed params" do
        before do
          post api_v1_tasks_path, 
          params: { "task": { "name": "Spec Task", "note": "This is a note", "due_date": "", "group_id": group.id } }
        end

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
        before do
          post api_v1_tasks_path, 
          params: { "task": { "name": "Spec Task", "note": "This is a note", "due_date": "2050-12-10" } }
        end

        it { expect(response).to have_http_status(401) }

        it "does not create the task" do
          expect(Task.find_by(name: "Spec Task")).to_not be_present
        end

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to eq("Unauthorized access or action")
        end
      end
    end
  end

  describe "PATCH /update" do
    # 2xx RESPONSE: {"task": task_instance, "message": "The task was successfully updated"}
    # 4xx RESPONSE: {"message": error_message}
    before do
      sign_in user
    end

    context "with valid parameters" do
      before do
        patch api_v1_task_path(task.id), 
        params: { "task": { "name": "Spec Task 2" } }
      end

      it { expect(response).to have_http_status(:success) }

      it "updates the task" do
        task.reload
        expect(task.name).to eq("Spec Task 2")
      end

      it "returns a json with the updated info of the user tasks" do
        json = JSON.parse(response.body)

        expect(json["task"]["name"]).to eq("Spec Task 2")
        expect(json["message"]).to eq("The task was successfully updated")
      end
    end

    context "with invalid parameters" do
      before do
        patch api_v1_task_path(task.id), 
        params: { "task": { "due_date": "" } }
      end

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
    context "with valid params" do
      before do
        sign_in user
        delete api_v1_task_path(task.id)
      end

      it { expect(response).to have_http_status(:success) }

      it { expect{ task.reload }.to raise_error(ActiveRecord::RecordNotFound) }

      it "returns a json with updated info of user tasks" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("The task was successfully deleted")
      end
    end

    context "with invalid params" do
      before do
        sign_in user
        delete api_v1_task_path(1234)
      end

      it { expect(response).to have_http_status(404) }

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Record not found")
      end
    end
  end

  describe "GET /search_tasks" do
    # 2xx RESPONSE: {"tasks": [task_instances]}
    # 2xx Empty RESPONSE: {"message": "There are no matches for your search"}
    before do
      # We create 3 out of 4 tasks with the same user
      create :task, user: user, name: "Task 2", note: "The first note"
      create :task, name: "Task 3", note: "The second note"
      create :task, user: user, name: "Task 4", note: "The third note"

      sign_in user
      get api_v1_search_user_tasks_path(query)
    end

    context "when search param exactly exists in task name or note" do
      let(:query) { "Task 4" }
      
      it { expect(response).to have_http_status(:success) }

      it "returns a json with the user's tasks that matched the query" do
        json = JSON.parse(response.body)

        expect(json["tasks"].length).to eq 1
        expect(json["tasks"].first["name"]).to eq("Task 4")
      end
    end

    context "when search param partially exists in task name or note" do
      let(:query) { "Note" }

      it { expect(response).to have_http_status(:success) }

      it "returns a json with the user's tasks that matched the query" do
        json = JSON.parse(response.body)
        
        expect(json["tasks"].length).to eq 2
      end
    end

    context "when search param doesn't exist in task name or note" do
      let(:query) { "rand" }
      
      it { expect(response).to have_http_status(404) }

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("There are no matches for your search")
      end
    end
  end
end
