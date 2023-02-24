require 'rails_helper'

RSpec.describe "Tasks", type: :request do
  describe "GET /index" do
    context "when done from a specific group" do
      expect(response).to have_http_status(:success)
      it "returns a json with all the tasks of the user" do
      end
    end

    context "when done from the user dashboard" do
      expect(response).to have_http_status(:success)
      it "returns a json with the tasks of the user for that group" do
      end
    end
  end

  describe "GET /show" do
    expect(response).to have_http_status(:success)
    it "returns a json with a specific task of the user" do
    end
  end

  describe "POST /create" do
    context "when done from a specific group" do
      context "with valid parameters" do
        expect(response).to have_http_status(:success)
        it "creates the task for that group" do
          # Here we check the creation happened
        end
  
        it "returns a json with the info of the new task" do
        end
      end
  
      context "with invalid parameters" do
        expect(response).to have_http_status(:error)
        it "does not create the task" do
        end
  
        it "returns a json with an error message" do
        end
      end
    end

    context "when done from the user dashboard" do
      context "with valid parameters" do
        expect(response).to have_http_status(:success)
        it "creates the task" do
          # Here we check the creation happened
        end
  
        it "returns a json with the info of the new task" do
        end
      end
  
      context "with invalid parameters" do
        expect(response).to have_http_status(:error)
        it "does not create the task" do
        end
  
        it "returns a json with an error message" do
        end
      end
    end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      expect(response).to have_http_status(:success)
      it "updates the task" do
      end

      it "returns a json with the info of the new task" do
      end
    end

    context "with invalid parameters" do
      expect(response).to have_http_status(:error)
      it "does not update the task" do
      end

      it "returns a json with an error message" do
      end
    end
  end

  describe "DELETE /destroy" do
    expect(response).to have_http_status(:success)
    it "deletes the task" do
      
    end

    it "deletes the task's dependent associations" do
      # taggedtasks
    end

    it "returns a json with updated info of user tasks" do
    end
  end
end
