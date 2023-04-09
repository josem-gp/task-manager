require 'rails_helper'

RSpec.describe "Users::Registrations", type: :request do
  describe "POST /create" do
    before do
       # We need to create an icon so that we can attach it to the use when created
       create :icon
    end
    context "when valid params" do
      context "when user signs up directly" do
        before do
          post user_registration_path,
          params: { "user": { "username": "test", "email": "myemail@email.com", "password": "mypassword" }}
        end

        it { expect(response).to have_http_status(:success) }

        it "returns a json with a success message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to match("Signed up succesfully")
          expect(json["userObject"]["user"]["email"]).to eq("myemail@email.com")
        end

        it "creates the user" do
          expect(User.find_by(email: "myemail@email.com")).to be_present
        end

        it "doesn't create any membership for the user" do
          user = User.find_by(email: "myemail@email.com")
          expect(Membership.where(user: user).count).to eq 0
        end
      end

      context "when user signs up via invitation" do
        let(:group) {create :group}
        
        before do
          # We create a session with the group id
          session = { group: group.id }
          allow_any_instance_of(Users::RegistrationsController).to receive(:session).and_return(session)
 
          post user_registration_path,
          params: { "user": { "username": "test", "email": "myemail@email.com", "password": "mypassword" }}
        end

        it { expect(response).to have_http_status(:success) }

        it "returns a json with a success message" do
          json = JSON.parse(response.body)

          expect(json["message"]).to match("Signed up succesfully")
          expect(json["userObject"]["user"]["email"]).to eq("myemail@email.com")
        end

        it "creates the user" do
          expect(User.find_by(email: "myemail@email.com")).to be_present
        end

        it "creates membership to the inviting group for the user" do
          user = User.find_by(email: "myemail@email.com")
          expect(Membership.where(user: user, group: group).count).to eq 1
        end
      end
    end

    context "when invalid params" do
      before do
        # We need to create an icon so that we can attach it to the use when created
        create :icon

        post user_registration_path,
        params: { "user": { "email": "myemail@email.com", "password": "mypassword" }}
      end

      it { expect(response).to have_http_status(400) }

      it "returns a json with a success message" do
        json = JSON.parse(response.body)

        expect(json["message"]).to match("There was an error when trying to sign up")
      end

      it "doesn't create the user" do
        expect(User.find_by(email: "myemail@email.com")).to_not be_present
      end
    end
  end
end
