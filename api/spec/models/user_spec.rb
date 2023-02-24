require 'rails_helper'

RSpec.describe User, type: :model do
  describe "model validation" do
    subject { create :user }
    let(:duplicated_username) {build :user, username: subject.username.upcase }
    let(:duplicated_email) {build :user, email: subject.email.upcase }

    context "when not valid" do    
      it "lacks username" do
        subject.username = nil
        expect(subject).to_not be_valid
        expect(subject.errors["username"]).to include("can't be blank")
      end

      it "lacks email" do 
        subject.email = nil
        expect(subject).to_not be_valid
        expect(subject.errors["email"]).to include("can't be blank")
      end

      it "lacks password" do 
        subject.password = nil
        expect(subject).to_not be_valid
        expect(subject.errors["password"]).to include("can't be blank")
      end

      it "has invalid name" do
        subject.username = "a"
        expect(subject).to_not be_valid
        expect(subject.errors["username"]).to include("is too short (minimum is 3 characters)")
      end

      it "has invalid password" do 
        subject.password = "12345"
        expect(subject).to_not be_valid
        expect(subject.errors["password"]).to include("is too short (minimum is 6 characters)") # To test Devise password validation
      end

      it "has invalid email" do 
        subject.email = "factorytest.io"
        expect(subject).to_not be_valid
        expect(subject.errors["email"]).to include("is invalid") # To test Devise email validation
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
    subject { build :user }
    let(:parameterized_mailer) { double('ActionMailer::Parameterized::Mailer') }
    let(:parameterized_message) { double('ActionMailer::Parameterized::MessageDelivery') }

    before do 
      allow(UserConfirmationMailer).to receive(:with).and_return(parameterized_mailer)
      allow(parameterized_mailer).to receive(:user_registration_email).and_return(parameterized_message)
      allow(parameterized_message).to receive(:deliver_later)
    end
    
    context "when user is created" do
      it "attachs a default icon" do
        expect(subject.icon).to be_present
        expect(subject.icon.name).to match("default_icon")
      end

      it "enqueues welcome email" do
        subject.icon.save!
        subject.save!
      
        expect(UserConfirmationMailer).to have_received(:with).with(user: subject)
        expect(parameterized_mailer).to have_received(:user_registration_email)
        expect(parameterized_message).to have_received(:deliver_later)
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
