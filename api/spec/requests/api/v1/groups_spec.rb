require 'rails_helper'

RSpec.describe "Api::V1::Groups", type: :request do
  # This creates a group with an admin on one side (and all associations in the Factory model) 
  # and also a user that is then added to the group
  let(:groups) { create_list :group, 3 }
  let(:group) { groups.first }
  let(:user) { create :user }
  let!(:membership) {create :membership, user: user, group: group}

  describe "GET /show" do
    # 2xx RESPONSE: { "group": user_instance, 
    #                 "groupUsers": [{user: user_instance, user_icon: icon_instance}], 
    #                 "groupTasks": {today: [task_instances], upcoming: [task_instances], past: [task_instances]}, 
    #                 "groupTags": [group_tags], 
    #                 "groupInvitations": [group_invitations]
    #               }
    # 4xx RESPONSE: {"message": "Record not found"} -> comes from our customized exception handler
    before do
      sign_in user
      get api_v1_group_path(param)
    end

    context "with valid parameters" do 
      let(:param) {group.id}

      it { expect(response).to have_http_status(:success) }

      it "returns a json with the info of the group" do
        json = JSON.parse(response.body)
  
        expect(json).to have_key("group").and(have_key("groupUsers")).and(have_key("groupTasks")).and(have_key("groupTags")).and(have_key("groupInvitations"))
        expect(json["group"]["id"]).to eq group.id
        expect(json["groupUsers"].length).to eq 2
        expect(json["groupTasks"].length).to eq 3
        expect(json["groupTags"].length).to eq 1
        expect(json["groupInvitations"].length).to eq 1
      end
    end

    context "with invalid parameters" do 
      let(:param) {1234}

      it { expect(response).to have_http_status(:missing) }

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Record not found")
      end
    end
  end

  describe "POST /create" do
    # 2xx RESPONSE: {"group": group_instance, "message": "The group was successfully created"}
    # 4xx RESPONSE: {"message": error_message}
    before do
      sign_in user
      post api_v1_groups_path, 
      params: params
    end

    context "with valid parameters" do 
      let(:params) { { "group": { "name": "Spec Group", "description": "This is a spec group" } } }

      it { expect(response).to have_http_status(:success) }

      it "returns a json with the updated info of the user groups" do
        json = JSON.parse(response.body)

        expect(json["group"]["name"]).to eq("Spec Group")
        expect(json["message"]).to eq("The group was successfully created")
      end

      it "has the user set as the admin" do
        json = JSON.parse(response.body)

        expect(Group.find_by(name: "Spec Group").admin.id).to eq(user.id)
      end
    end

    context "with invalid parameters" do 
      let(:params) { { "group": { "name": "a", "description": "This is a spec 2 group" } } }

      it { expect(response.status).to eq(400) }

      it "does not creates the group" do
        expect(Group.find_by(name: "a")).to_not be_present
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to match("Name is too short")
      end
    end
  end

  describe "PATCH /update" do
    # 2xx RESPONSE: {"group": group_instance, "message": "The group was successfully updated"}
    # 4xx RESPONSE: {"message": error_message}
    # 4xx RESPONSE: {"message": "You don't have authorization to update the group"}
    context "when user is admin" do
      before do
        sign_in group.admin
        patch api_v1_group_path(group.id), 
        params: params
      end

      context "with valid parameters" do
        let(:params) { {"group": {"name": "Updated Group"}} }

        it { expect(response).to have_http_status(:success) }

        it "updates the group" do
          group.reload
          expect(group["name"]).to eq("Updated Group")
        end

        it "returns a json with the updated info of the user groups" do
          json = JSON.parse(response.body)

          expect(json["group"]["name"]).to eq("Updated Group")
          expect(json["message"]).to eq("The group was successfully updated")
        end
      end

      context "with invalid parameters" do
        let(:params) { {"group": {"name": "a"}} }

        it { expect(response).to have_http_status(400) }

        it "does not create the group" do
          group.reload
          expect(group["name"]).to_not eq("a")
        end

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to match("Name is too short")
        end
      end
    end

    context "when user is not admin" do
      before do
        sign_in user
        patch api_v1_group_path(group.id), 
        params: {"group": {"name": "Spec Group"}}
      end

      it {expect(response).to have_http_status(401)}

      it "does not update the group" do
        group.reload
        expect(group["name"]).to_not eq("Spec Group")
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Unauthorized access or action")
      end
    end
  end

  describe "DELETE /destroy" do
    # 2xx RESPONSE: {"message": "The group was successfully deleted"}
    # 4xx RESPONSE: {"message": "The group couldn't be deleted"}
    context "when user is admin" do
      before do
        sign_in group.admin
        delete api_v1_group_path(param)
      end

      context "when valid params" do
        let(:param) {group.id}

        it { expect(response).to have_http_status(:success) }

        it { expect{ group.reload }.to raise_error(ActiveRecord::RecordNotFound) }

        it "returns a json with the updated info of the user groups" do
          json = JSON.parse(response.body)

          expect(json["message"]).to eq("The group was successfully deleted")
        end
      end

      context "when invalid params" do
        let(:param) {1234}
        
        it { expect(response).to have_http_status(404) }

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to eq("Record not found")
        end
      end
    end

    context "when user is not admin" do
      before do
        sign_in user
        delete api_v1_group_path(group.id)
      end

      it { expect(response).to have_http_status(401) }

      it "does not delete the group" do
        expect(Group.find(group.id)).to be_present
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Unauthorized access or action")
      end
    end
  end

  describe "POST /filter_tasks" do
    # 2xx RESPONSE: {"tasks": {today: [task_instances], upcoming: [task_instances], past: [task_instances]}}
    let(:task_one) {create :task, group: group, user: user, assignee: nil, due_date: Date.current + 10} 
    let(:task_two) {create :task, group: group, assignee: user, finished: true, due_date: Date.current - 10}
    let(:tags) {create_list :tag, 3, group: group}
    before do
      # The user is not owner nor assignee of one of the following task so I will not be fetched
      create :task, group: group, assignee: nil, finished: true, due_date: Date.current
      create :tagged_task, task: task_one, tag: tags.first
      create :tagged_task, task: task_one, tag: tags.last
      create :tagged_task, task: task_two, tag: tags.second

      sign_in user

      post filter_tasks_api_v1_group_path(group.id),
      params: params
    end

    context "when filter param is empty" do
      let(:params) { {} }
      
      it { expect(response).to have_http_status(:success) }



      it "returns all tasks for that group divided by date" do
        json = JSON.parse(response.body)

        expect(json["tasks"]["upcoming"].length).to eq 4 # Because of the group factory callback
        expect(json["tasks"]["today"].length).to eq 1
        expect(json["tasks"]["past"].length).to eq 1
      end

      it "returns each task and their tags" do 
        json = JSON.parse(response.body)

        expect(json["tasks"]["past"].first).to have_key("task").and have_key("task_tags")
        expect(json["tasks"]["past"].first["task_tags"].length).to eq 1
      end
    end

    context "when filter param has only one param" do
      # The enums are in app/models/task.rb
      let(:params) { {"by_status": "1"} }

      it { expect(response).to have_http_status(:success) }

      it "returns the searched tasks for that group divided by date" do
        json = JSON.parse(response.body)

        expect(json["tasks"]["upcoming"].length).to eq 0
        expect(json["tasks"]["today"].length).to eq 1
        expect(json["tasks"]["past"].length).to eq 1
      end

      it "returns each task and their tags" do 
        json = JSON.parse(response.body)

        expect(json["tasks"]["past"].first).to have_key("task").and have_key("task_tags")
        expect(json["tasks"]["past"].first["task_tags"].length).to eq 1
      end
    end

    context "when filter param has more than one param" do
      let(:params) { {"by_fuzzy_name": "Factory task", "by_status": "0", "from_due_date": "", "to_due_date": ""}  }

      it { expect(response).to have_http_status(:success) }

      it "returns the searched tasks for that group divided by date" do
        json = JSON.parse(response.body)

        expect(json["tasks"]["upcoming"].length).to eq 4
        expect(json["tasks"]["today"].length).to eq 0
        expect(json["tasks"]["past"].length).to eq 0
      end

      it "returns each task and their tags" do 
        json = JSON.parse(response.body)

        expect(json["tasks"]["past"].first).to be_nil
        expect(json["tasks"]["upcoming"].first["task_tags"].length).to eq 1
      end
    end

    context "when filtering by ranged date" do
      let(:params) { {"by_fuzzy_name": "Factory task", "from_due_date": Date.current , "to_due_date": Date.current + 15} }

      it { expect(response).to have_http_status(:success) }

      it "returns the searched tasks for that group divided by date" do
        json = JSON.parse(response.body)

        expect(json["tasks"]["upcoming"].length).to eq 4
        expect(json["tasks"]["today"].length).to eq 1
        expect(json["tasks"]["past"].length).to eq 0
      end

      it "returns each task and their tags" do 
        json = JSON.parse(response.body)

        expect(json["tasks"]["upcoming"].first["task_tags"].length).to eq 1
      end
    end

    context "when filtering doesn't return any values" do
      let(:params) { {"by_fuzzy_name": "rand", "from_due_date": "2030-11-30", "to_due_date": "2030-12-24"} }
      
      it { expect(response).to have_http_status(404) }

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("There are no matches for your search")
      end
    end
  end

  describe "POST /send_invitation" do
    # 2xx RESPONSE: {"id": group_id, "message": "The invitation was successfully created"}
    # 4xx RESPONSE: {"id": group_id, "message": "The invitation couldn't be created"}
    let(:parameterized_mailer) { double('ActionMailer::Parameterized::Mailer') }
    let(:parameterized_message) { double('ActionMailer::Parameterized::MessageDelivery') }

    before do
      allow(InvitationMailer).to receive(:with).and_return(parameterized_mailer)
      allow(parameterized_mailer).to receive(:send_invite).and_return(parameterized_message)
      allow(parameterized_message).to receive(:deliver_later)
    end

    context "when user is admin" do
      before do
        sign_in group.admin
        post send_invitation_api_v1_group_path(group.id),
        params: params
      end

      context "when valid params" do
        let(:params) { { "invitation": { "email": "test@test.io" } } }
  
        it { expect(response).to have_http_status(:success) }

        it "creates an invitation" do
          expect(Invitation.find_by(email: "test@test.io")).to be_present
        end
  
        it "enqueues an invitation" do
          invitation = Invitation.find_by(email: "test@test.io")
          expect(InvitationMailer).to have_received(:with).with(recipient: "test@test.io", sender: group.admin, url: invitation.oauth_token)
          expect(parameterized_mailer).to have_received(:send_invite)
          expect(parameterized_message).to have_received(:deliver_later)
        end

        it "enqueues a job to disable the invitation" do
          expect(DisableInvitationJob).to have_been_enqueued
          .with(invitation: Invitation.last)
          .on_queue("default")
          .at(Date.tomorrow.noon + 7.days)
          .exactly(:once)
        end
  
        it "returns a json with a success message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to eq("The invitation was successfully sent")
        end
      end

      context "when invalid params" do
        let(:params) { { "invitation": { "email": "test.io" } } }

        it { expect(response).to have_http_status(400) }

        it "does not create any invitation" do
          expect(Invitation.find_by(email: "test.io")).to_not be_present
        end

        it "does not enqueues a job to disable the invitation" do
          expect(DisableInvitationJob).to_not have_been_enqueued
        end

        it "returns a json with an error message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to eq("The invitation couldn't be created")
        end
      end
    end

    context "when user is not admin" do
      before do
        sign_in user

        post send_invitation_api_v1_group_path(group.id),
        params: { "invitation": { "email": "test@test.io" } }
      end

      it { expect(response).to have_http_status(401) }

      it "does not create any invitation" do
        expect(Invitation.find_by(email: "test@test.io")).to_not be_present
      end

      it "does not enqueue any invitation" do
        expect(InvitationMailer).to_not have_received(:with).with(recipient: "test@test.io", sender: user, group: group)
        expect(parameterized_mailer).to_not have_received(:send_invite)
        expect(parameterized_message).to_not have_received(:deliver_later)
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Unauthorized access or action")
      end
    end
  end

  describe "DELETE /remove_user" do
    # 2xx RESPONSE: {"message": "The user was successfully removed"}
    # 4xx RESPONSE: {"message": "The user couldn't be removed"}
    let(:new_user) {create :user}

    before do
      create(:task, name: "User task", user: new_user, group: group)
      create(:tag, name: "User tag", user: new_user, group: group)
      create(:membership, user: new_user, group: group)
    end

    context "when user is admin" do
      before do
        sign_in group.admin
        delete remove_group_user_api_v1_group_path(id: group.id, user_id: new_user.id)
      end

      it { expect(response).to have_http_status(:success) }

      it "deletes the user" do
        expect(Group.find(group.id).users.where(id: new_user.id).count).to eq 0
      end

      it "returns a json with the updated list of users in the group" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("The user was successfully removed")
      end
    end

    context "when user is not admin" do
      before do
        sign_in user
        delete remove_group_user_api_v1_group_path(id: group.id, user_id: new_user.id)
      end

      it { expect(response).to have_http_status(401) }

      it "does not delete the user" do
        expect(Group.find(group.id).users.where(id: new_user.id).count).to eq 1
      end

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to eq("Unauthorized access or action")
      end
    end
  end
end
