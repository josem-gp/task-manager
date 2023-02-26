require 'rails_helper'

RSpec.describe "Groups", type: :request do
  # This creates a group with an admin on one side (and all associations in the Factory model) 
  # and also a user that is then added to the group
  let(:group) { create :group }
  let(:user) { create :user }
  let!(:membership) {create :membership, user: user, group: group}

  describe "GET /index" do
    # 2xx RESPONSE: {"id": group_id, "groups": [group_instances]}
    before do
      sign_in user
      get api_v1_groups_path
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with the info of the groups" do
      json = JSON.parse(response.body)

      expect(json.groups.length).to eq 1
      expect(json.groups.first.name).to eq(group.name)
    end
  end

  describe "GET /show" do
    # PARAMS: params[:id]
    # 2xx RESPONSE: {"id": group_id, "group": group_instance}
    before do
      sign_in user
      get api_v1_group_path(group.id)
    end

    it { expect(response).to have_http_status(:success) }

    it "returns a json with a specific group of the user" do
      json = JSON.parse(response.body)

      expect(json.group.keys).to contain_exactly('id', 'name', 'description', 'admin_id')
      expect(json.group.name).to eq(group.name)
    end
  end

  describe "POST /create" do
    # CALL PARAMS: {"group": {"name": ..., "description": ...}}
    # 2xx RESPONSE: {"id": group_id, "groups": [group_instances], "message": "The group was succesfully created"}
    # 4xx RESPONSE: {"id": group_id, "message": "The group couldn't be created"}
    before do
      sign_in user
      headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
      auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    end

    context "with valid parameters" do 
      before do
        post api_v1_groups_path, 
        params: '{ "group": { "name": "Spec Group", "description": "This is a spec group" } }', 
        headers: auth_headers
      end

      it { expect(response).to have_http_status(:success) }

      it "creates the group" do
        expect(Group.find_by(name: "Spec Group")).to be_present
      end

      it "returns a json with the updated info of the user groups" do
        json = JSON.parse(response.body)

        expect(json.groups.length).to eq 2
        expect(json.groups.last.name).to eq("Spec Group")
        expect(json.message).to eq("The group was succesfully created")
      end

      it "has the user set as the admin" do
        json = JSON.parse(response.body)

        expect(json.group.admin.id).to eq(user.id)
      end
    end

    context "with invalid parameters" do 
      before do
        post api_v1_groups_path, 
        params: '{ "group": { "name": "a", "description": "This is a spec 2 group" } }', 
        headers: auth_headers
      end

      it { expect(response).to have_http_status(:error) }
      it "does not creates the group" do
        expect(Group.find_by(name: "a")).to_not be_present
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json.message).to eq("The group couldn't be created")
      end
    end
  end

  describe "PATCH /update" do
    # CALL PARAMS: {"group": {"name": ..., "description": ...}}
    # 2xx RESPONSE: {"id": group_id, "groups": [group_instances], "message": "The group was succesfully updated"}
    # 4xx RESPONSE: {"id": group_id, "message": "The group couldn't be updated"}
    # 4xx RESPONSE: {"id": group_id, "message": "You don't have authorization to update the group"}
    context "when user is admin" do
      before do
        sign_in group.admin
        headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, group.admin)
      end

      context "with valid parameters" do
        before do
          patch api_v1_group_path(group.id), 
          params: '{"group": {"name": "Updated Group"}}', 
          headers: auth_headers
        end

        it { expect(response).to have_http_status(:success) }

        it "updates the group" do
          expect(group.name).to eq("Updated Group")
        end

        it "returns a json with the updated info of the user groups" do
          json = JSON.parse(response.body)

          expect(json.groups.first).to eq 1
          expect(json.groups.first.name).to eq("Updated Group")
          expect(json.message).to eq("The group was succesfully updated")
        end
      end

      context "with invalid parameters" do
        before do
          patch api_v1_group_path(group.id), 
          params: '{"group": {"name": "a"}}', 
          headers: auth_headers
        end

        it { expect(response).to have_http_status(:error) }

        it "does not create the group" do
          expect(group.name).to_not eq("a")
        end

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json.message).to eq("The group couldn't be updated")
        end
      end
    end

    context "when user is not admin" do
      before do
        sign_in user
        headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
      end

      expect{
        patch api_v1_group_path(group.id), 
        params: '{"group": {"name": "Spec Group"}}', 
        headers: auth_headers
      }.to have_http_status(:error)

      it "does not update the group" do
        expect(group.name).to_not eq("Spec Group")
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json.message).to eq("You don't have authorization to update the group")
      end
    end
  end

  describe "DELETE /destroy" do
    # CALL PARAMS: {"group": {"name": ..., "description": ...}}
    # 2xx RESPONSE: {"id": group_id, "groups": [group_instances], "message": "The group was successfully deleted"}
    # 4xx RESPONSE: {"id": group_id, "message": "The group couldn't be deleted"}
    context "when user is admin" do
      before do
        sign_in group.admin
        delete api_v1_group_path(group.id)
      end

      it { expect(response).to have_http_status(:success) }

      it "deletes the group" do
        expect(Group.find(group.id)).to_not be_present
      end

      it "returns a json with the updated info of the user groups" do
        json = JSON.parse(response.body)

        expect(json.groups.length).to eq 0
        expect(json.message).to eq("The group was succesfully deleted")
      end
    end

    context "when user is not admin" do
      expect(response).to have_http_status(:error)
      it "does not delete the group" do
        expect(Group.find(group.id)).to be_present
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json.message).to eq("The group couldn't be deleted")
      end
    end
  end

  describe "GET /filter_tasks" do
    # CALL PARAMS: {"task": {"name": "", "assignee": "", "finished": "true or false", "due_date": ""}}
    # 2xx RESPONSE: {"id": group_id, "tasks": [group_instances]}

    before do
      sign_in user
    end

    context "when filter param is empty" do
      before do
        get filter_tasks_api_v1_group_path(group.id)
      end
      
      it { expect(response).to have_http_status(:success) }

      it "returns an array of all tasks for that group" do
        json = JSON.parse(response.body)

        expect(json.task.length).to eq 3
      end
    end

    context "when filter param has only one param" do
      let!(:task) {create :task, group: group, finished: true}

      before do
        get filter_tasks_api_v1_group_path(group.id),
        params: '{"task": {"name": "", "assignee": "", "finished": "true", "due_date": ""}', 
      end

      it { expect(response).to have_http_status(:success) }

      it "returns an array the tasks that fit the search in the group" do
        json = JSON.parse(response.body)

        expect(json.task.length).to eq 1
      end
    end

    context "when filter param has more than one param" do
      let!(:task) {create_list :task, group: group, finished: true, 2}

      before do
        get filter_tasks_api_v1_group_path(group.id),
        params: '{"task": {"name": "Factory task", "assignee": "", "finished": "true", "due_date": "24/07/2050"}', 
      end

      it { expect(response).to have_http_status(:success) }

      it "returns an array the tasks that fit the search in the group" do
        json = JSON.parse(response.body)

        expect(json.task.length).to eq 2
      end
    end
  end

  describe "POST /send_invitation" do
    # PARAMS: params[:group_id] && '{"group": {"email": "xxxx@test.io"}}'
    # 2xx RESPONSE: {"id": group_id, "message": "The invitation was successfully created and enqueued"}
    # 4xx RESPONSE: {"id": group_id, "message": "The invitation couldn't be created"}

    context "when user is admin" do
      let(:parameterized_mailer) { double('ActionMailer::Parameterized::Mailer') }
      let(:parameterized_message) { double('ActionMailer::Parameterized::MessageDelivery') }

      before do
        sign_in group.admin
        headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, group.admin)

        allow(InvitationMailer).to receive(:with).and_return(parameterized_mailer)
        allow(parameterized_mailer).to receive(:user_registration_email).and_return(parameterized_message)
        allow(parameterized_message).to receive(:deliver_later)
      end

      context "when valid params" do
        before do 
          post send_invitation_api_v1_group_path(group.id),
          params: '{ "group": { "email": "test@test.io" } }', 
          headers: auth_headers
        end
  
        it { expect(response).to have_http_status(:success) }

        it "creates an invitation" do
          expect(Invitation.find_by(email: "test@test.io")).to be_present
        end
  
        it "enqueues an invitation" do
          expect(InvitationMailer).to have_received(:with).with(recipient: "test@test.io", sender: group.email, group: group)
          expect(parameterized_mailer).to have_received(:send_invite)
          expect(parameterized_message).to have_received(:deliver_later)
        end
  
        it "returns a json with a success message" do
          json = JSON.parse(response.body)

          expect(json.message).to eq("The invitation was successfully created and enqueued")
        end
      end

      context "when invalid params" do
        before do
          post send_invitation_api_v1_group_path(group.id),
          params: '{ "group": { "email": "test.io" } }', 
          headers: auth_headers
        end

        it { expect(response).to have_http_status(:error) }

        it "does not create any invitation" do
          expect(Invitation.find_by(email: "test.io")).to_not be_present
        end

        it "does not enqueue any invitation" do
          expect(InvitationMailer).to_not have_received(:with).with(recipient: "test.io", sender: group.email, group: group)
          expect(parameterized_mailer).to_not have_received(:send_invite)
          expect(parameterized_message).to_not have_received(:deliver_later)
        end

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json.message).to eq("The invitation couldn't be created")
        end
      end
    end

    context "when user is not admin" do
      before do
        sign_in user
        headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)

        post send_invitation_api_v1_group_path(group.id),
        params: '{ "group": { "email": "test@test.io" } }',
        headers: auth_headers
      end

      it { expect(response).to have_http_status(:error) }

      it "does not create any invitation" do
        expect(Invitation.find_by(email: "test@test.io")).to_not be_present
      end

      it "does not enqueue any invitation" do
        expect(InvitationMailer).to_not have_received(:with).with(recipient: "test@test.io", sender: group.email, group: group)
        expect(parameterized_mailer).to_not have_received(:send_invite)
        expect(parameterized_message).to_not have_received(:deliver_later)
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json.message).to eq("The invitation couldn't be created")
      end
    end
  end

  describe "DELETE /remove_user" do
    # PARAMS: params[:group_id, :user_id]
    # 2xx RESPONSE: {"id": group_id, "user": [user_instances] , "message": "The user was successfully removed"}
    # 4xx RESPONSE: {"id": group_id, "message": "The user couldn't be removed"}
    let(:new_user) {create :user}

    before do
      create(:task, name: "User task", user: user, group: group)
      create(:tag, name: "User tag", user: user, group: group)
      create(:membership, user: new_user, group: group)
    end

    context "when user is admin" do
      before do
        sign_in group.admin
        get remove_group_user_api_v1_group_path(group.id, user)
      end

      it { expect(response).to have_http_status(:success) }

      it "deletes the user" do
        expect(Group.find(group.id).users.where(id: user.id).count).to eq 0
      end

      it "changes the ownership of user's tasks to group admin" do
        expect(Task.where(group: g).and(Task.where(user: user)).count).to eq 0
        expect(Task.where(group: g).and(Task.where(user: group.admin)).count).to eq 1
      end

      it "changes the ownership of user's tags to group admin" do
        expect(Tag.where(group: g).and(Tag.where(user: user)).count).to eq 0
        expect(Tag.where(group: g).and(Tag.where(user: group.admin)).count).to eq 1
      end

      it "returns a json with the updated list of users in the group" do
        json = JSON.parse(response.body)

        expect(json.users.length).to eq 2
        expect(json.message).to eq("The user was successfully removed")
      end
    end

    context "when user is not admin" do
      before do
        sign_in user
        get remove_group_user_api_v1_group_path(group.id, new_user)
      end

      it { expect(response).to have_http_status(:error) }

      it "does not delete the user" do
        expect(Group.find(group.id).users.where(id: new_user.id).count).to eq 1
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json.message).to eq("The user couldn't be removed")
      end
    end
  end
end
