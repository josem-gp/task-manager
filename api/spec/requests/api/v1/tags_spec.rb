require 'rails_helper'

RSpec.describe "Api::V1::Tags", type: :request do
  # This creates a group with an admin on one side (and all associations in the Factory model) 
  # and also a user that is then added to the group
  let(:group) { create :group }
  let(:user) { create :user }
  let(:tag) { group.tags.first }
  let!(:membership) {create :membership, user: user, group: group}

  describe "GET /index" do
    # 2xx RESPONSE: {"tags": [tag_instances]}
    before do
      sign_in user
      get api_v1_group_tags_path(group.id)
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with the tags for that group" do
      json = JSON.parse(response.body)

      expect(json["tags"].length).to eq 1
      expect(json["tags"].first["name"]).to eq(tag.name)
    end
  end

  describe "POST /create" do
    # 2xx RESPONSE: {"tag": tag_instance, "message": "The tag was successfully created"}
    # 4xx RESPONSE: {"message": error_message}
    before do
      sign_in user
    end

    context "with valid parameters" do
      before do
        post api_v1_group_tags_path(group.id), 
        params: { "tag": { "name": "Spec Tag" } }
      end

      it { expect(response).to have_http_status(:success) }

      it "creates the tag for that group" do
        expect(Tag.find_by(name: "Spec Tag")).to be_present
      end

      it "returns a json with the updated info of the group tags" do
        json = JSON.parse(response.body)

        expect(json["tag"]["name"]).to eq("Spec Tag")
        expect(json["message"]).to eq("The tag was successfully created")
      end
    end

    context "with invalid parameters" do
      before do
        post api_v1_group_tags_path(group.id), 
        params: { "tag": { "name": "Lorem ipsum dolor sit amet" } }
      end

      it { expect(response).to have_http_status(400) }

      it "does not create the tag" do
        expect(Tag.find_by(name: "Lorem ipsum dolor sit amet")).to_not be_present
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to match("Name is too long")
      end
    end
  end

  describe "PATCH /update" do
    # 2xx RESPONSE: {"tag": tag_instance, "message": "The tag was successfully updated"}
    # 4xx RESPONSE: {"message": error_message}
    before do
      sign_in user
    end

    context "with valid parameters" do
      before do
        patch api_v1_group_tag_path(group.id, tag.id), 
        params: { "tag": { "name": "Spec Tag 2" } }
      end

      it { expect(response).to have_http_status(:success) }

      it "updates the tag" do
        tag.reload
        expect(tag.name).to eq("Spec Tag 2")
      end

      it "returns a json with the updated info of the group tags" do
        json = JSON.parse(response.body)

        expect(json["tag"]["name"]).to eq("Spec Tag 2")
        expect(json["message"]).to eq("The tag was successfully updated")
      end
    end

    context "with invalid parameters" do
      before do
        patch api_v1_group_tag_path(group.id, tag.id), 
        params: { "tag": { "name": "Lorem ipsum dolor sit amet" } }
      end

      it { expect(response).to have_http_status(400) }

      it "does not update the tag" do
        tag.reload

        expect(tag.name).to_not eq("Lorem ipsum dolor sit amet")
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to match("Name is too long")
      end
    end
  end

  describe "DELETE /destroy" do
    # 2xx RESPONSE: {"message": "The tag was successfully deleted"}
    # 4xx RESPONSE: {"message": "The tag couldn't be deleted"}
    context "with valid params" do
      before do
        sign_in user
        delete api_v1_group_tag_path(group.id, tag.id)
      end

      it { expect(response).to have_http_status(:success) }

      it { expect{ tag.reload }.to raise_error(ActiveRecord::RecordNotFound) }

      it "returns a json with updated info of group tags" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("The tag was successfully deleted")
      end
    end

    context "with invalid params" do
      before do
        sign_in user
        delete api_v1_group_tag_path(group.id, 1234)
      end
      
      it { expect(response).to have_http_status(404) }

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Record not found")
      end
    end
  end
end
