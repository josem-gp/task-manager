require 'rails_helper'

RSpec.describe User, type: :model do
  describe "model validation" do
    subject { create :valid_user }

    context "when not valid" do     
      let(:user_without_username) {build :user_without_username }
      let(:user_without_email) { build :user_without_email }
      let(:user_without_password) { build :user_without_password }
      let(:user_with_invalid_username) {build :user_with_invalid_username }
      let(:user_with_invalid_password) {build :user_with_invalid_password }
      let(:user_with_invalid_email) {build :user_with_invalid_email }
      let(:duplicated_username) {build :valid_user, username: subject.username.upcase }
      let(:duplicated_email) {build :valid_user, email: subject.email.upcase }

      it "lacks username" do
        expect(user_without_username).to_not be_valid
        expect(user_without_username.errors["username"]).to include("can't be blank")
      end

      it "lacks email" do 
        expect(user_without_email).to_not be_valid
        expect(user_without_email.errors["email"]).to include("can't be blank")
      end

      it "lacks password" do 
        expect(user_without_password).to_not be_valid
        expect(user_without_password.errors["password"]).to include("can't be blank")
      end

      it "has invalid name" do
        expect(user_with_invalid_username).to_not be_valid
        expect(user_with_invalid_username.errors["username"]).to include("is too short (minimum is 3 characters)")
      end

      it "has invalid password" do 
        expect(user_with_invalid_password).to_not be_valid
        expect(user_with_invalid_password.errors["password"]).to include("is too short (minimum is 6 characters)") # To test Devise password validation
      end

      it "has invalid email" do 
        expect(user_with_invalid_email).to_not be_valid
        expect(user_with_invalid_email.errors["email"]).to include("is invalid") # To test Devise email validation
      end

      it "has duplicated username" do
        # We create "subject" ahead and check if case sensitive validation works
        expect(duplicated_username).to_not be_valid
        expect(duplicated_username.errors["username"]).to include("has already been taken")
      end

      it "has duplicated email" do
        # We create "subject" ahead and check if case sensitive validation works
        expect(duplicated_email).to_not be_valid
        expect(duplicated_email.errors["email"]).to include("has already been taken")
      end
    end

    context "when valid" do
      it { is_expected.to be_valid }
    end
  end

  describe "#save" do
    subject { create :valid_user }

    context "when user is created" do
      it "attachs a default icon" do
        expect(subject.icon).to be_present
        expect(subject.icon.name).to match("default_icon")
      end

      it "enqueues welcome email" do
        expect { subject }.to have_enqueued_mail(UserConfirmationMailer, :user_registration_email)
      end
    end

    context "when user is updated" do
      let(:updated_icon) {create :icon, name: "updated_icon", url: Icon::IMAGES[1] }

      it "preserves icon" do
        subject.icon = updated_icon
        subject.save!
        expect(subject.icon).to be_present
        expect(subject.icon.name).to match("updated_icon")
      end
    end
  end
end
