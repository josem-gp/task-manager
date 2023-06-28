require 'rails_helper'

RSpec.describe "Users::Registrations", type: :request do
  describe "POST /create" do
    let(:user_email) { "myemail@email.com" }
    let(:group_name) { "TestGroup1" }
    let(:params) { { "user" => { "username" => "test", "email" => user_email, "password" => "mypassword", "groups_as_admin_attributes" => [{ "name" => group_name }] } } }

    before do
       # We need to create an icon so that we can attach it to the use when created
       create :icon
    end

    context "when valid params" do
      context "when user signs up directly" do
        before do
          post user_registration_path,
          params: params
        end

        it { expect(response).to have_http_status(:success) }

        it "returns a json with a success message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to match("Signed up succesfully")
          expect(json["userObject"]["user"]["email"]).to eq(user_email)
        end

        it "creates the user" do
          expect(User.find_by(email: user_email)).to be_present
        end

        it "creates a membership for the user to the group that was created" do
          user = User.find_by(email: user_email)
          group = Group.find_by(name: group_name)
          expect(Membership.where(user: user, group: group).count).to eq 1
        end
      end

      context "when user signs up via invitation" do
        let(:group) {create :group}
        
        before do
          # We create a session with the group id
          session = { group: group.id }
          allow_any_instance_of(Users::RegistrationsController).to receive(:session).and_return(session)
 
          post user_registration_path,
          params: params
        end

        it { expect(response).to have_http_status(:success) }

        it "returns a json with a success message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to match("Signed up succesfully")
          expect(json["userObject"]["user"]["email"]).to eq(user_email)
        end

        it "creates the user" do
          expect(User.find_by(email: user_email)).to be_present
        end

        it "creates membership to the inviting group for the user" do
          user = User.find_by(email: user_email)
          expect(Membership.where(user: user, group: group).count).to eq 1
        end
      end
    end

    context "when invalid params" do
      before do
        # We need to create an icon so that we can attach it to the use when created
        create :icon

        post user_registration_path,
        params: { "user" => { "email" => user_email, "password" => "mypassword", "groups_as_admin_attributes" => [{ "name" => group_name }] } }
      end

      it { expect(response).to have_http_status(400) }

      it "returns a json with an error message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to match("Username can't be blank")
      end

      it "doesn't create the user" do
        expect(User.find_by(email: user_email)).to_not be_present
      end
    end
  end
end
