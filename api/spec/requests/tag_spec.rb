require 'rails_helper'

RSpec.describe "Tags", type: :request do
  # This creates a group with an admin on one side (and all associations in the Factory model) 
  # and also a user that is then added to the group
  let(:group) { create :group }
  let(:user) { create :user }
  let(:tag) { group.tags.first }
  let!(:membership) {create :membership, user: user, group: group}

  describe "GET /index" do
    # 2xx RESPONSE: {"id": group_id, "tags": [tag_instances]}
    before do
      sign_in user
      get api_v1_group_tags_path
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with the tags for that group" do
      json = JSON.parse(response.body)

      expect(json.tags.length).to eq 1
      expect(json.tags.first.name).to eq(tag.name)
    end
  end

  describe "POST /create" do
    # CALL PARAMS: {"tag": {"name": ...}}
    # 2xx RESPONSE: {"id": group_id, "tag": tag_instances, "message": "The tag was succesfully created"}
    # 4xx RESPONSE: {"id": group_id, "message": "The tag couldn't be created"}
    before do
      sign_in user
      headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    end

    context "with valid parameters" do
      before do
        post api_v1_group_tags_path, 
        params: '{ "tag": { "name": "Spec Tag" } }', 
        headers: auth_headers
      end

      it { expect(response).to have_http_status(:success) }

      it "creates the tag for that group" do
        expect(Tag.find_by(name: "Spec Tag")).to be_present
      end

      it "returns a json with the updated info of the group tags" do
        json = JSON.parse(response.body)

        expect(json.tag.keys).to contain_exactly('id', 'name', 'slug', 'user_id', 'group_id')
        expect(json.tag.name).to eq("Spec Tag")
        expect(json.message).to eq("The tag was succesfully created")
      end
    end

    context "with invalid parameters" do
      before do
        post api_v1_group_tags_path, 
        params: '{ "tag": { "name": "Lorem ipsum dolor sit amet" } }', 
        headers: auth_headers
      end

      it { expect(response).to have_http_status(:error) }

      it "does not create the tag" do
        expect(Tag.find_by(name: "Lorem ipsum dolor sit amet")).to_not be_present
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json.message).to eq("The tag couldn't be created")
      end
    end
  end

  describe "PATCH /update" do
    # CALL PARAMS: {"tag": {"name": ...}}
    # 2xx RESPONSE: {"id": group_id, "tag": tag_instance, "message": "The tag was succesfully updated"}
    # 4xx RESPONSE: {"id": group_id, "message": "The tag couldn't be updated"}
    before do
      sign_in user
      headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    end

    context "with valid parameters" do
      before do
        post api_v1_group_tag_path(group.id, tag.id), 
        params: '{ "tag": { "name": "Spec Tag 2" } }', 
        headers: auth_headers
      end

      it { expect(response).to have_http_status(:success) }

      it "updates the tag" do
        expect(tag.name).to eq("Spec Tag 2")
      end

      it "returns a json with the updated info of the group tags" do
        json = JSON.parse(response.body)

        expect(json.tag.keys).to contain_exactly('id', 'name', 'slug', 'user_id', 'group_id')
        expect(json.tag.name).to eq("Spec Tag 2")
        expect(json.message).to eq("The tag was succesfully updated")
      end
    end

    context "with invalid parameters" do
      before do
        post api_v1_group_tag_path(group.id, tag.id), 
        params: '{ "tag": { "name": "Lorem ipsum dolor sit amet" } }', 
        headers: auth_headers
      end

      it { expect(response).to have_http_status(:error) }

      it "does not update the tag" do
        expect(tag.name).to_not eq("Lorem ipsum dolor sit amet")
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json.message).to eq("The tag couldn't be updated")
      end
    end
  end

  describe "DELETE /destroy" do
    # CALL PARAMS: {"tag": {"group_id": ..., "tag_id": ...}}
    # 2xx RESPONSE: {"id": group_id, "message": "The tag was successfully deleted"}
    before do
      sign_in user
      delete api_v1_group_tag_path(group.id, tag.id)
    end

    it { expect(response).to have_http_status(:success) }

    it "deletes the tag" do
      expect(Tag.find(tag.id)).to_not be_present
    end

    it "returns a json with updated info of group tags" do
      json = JSON.parse(response.body)

      expect(json.message).to eq("The tag was succesfully deleted")
    end
  end
end
