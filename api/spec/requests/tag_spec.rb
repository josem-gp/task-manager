require 'rails_helper'

RSpec.describe "Tags", type: :request do
  describe "GET /index" do
    expect(response).to have_http_status(:success)
    it "returns a json with the tags of the user for that group" do
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      expect(response).to have_http_status(:success)
      it "creates the tag for that group" do
        # Here we check the creation happened
      end

      it "returns a json with the info of the new tag" do
      end
    end

    context "with invalid parameters" do
      expect(response).to have_http_status(:error)
      it "does not create the tag" do
      end

      it "returns a json with an error message" do
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      expect(response).to have_http_status(:success)
      it "updates the tag" do
      end

      it "returns a json with the info of the new tag" do
      end
    end

    context "with invalid parameters" do
      expect(response).to have_http_status(:error)
      it "does not update the tag" do
      end

      it "returns a json with an error message" do
      end
    end
  end

  describe "DELETE /destroy" do
    expect(response).to have_http_status(:success)
    it "deletes the tag" do
      
    end

    it "deletes the tag's dependent associations" do
      # taggedtasks
    end

    it "returns a json with updated info of group tags" do
    end
  end
end
