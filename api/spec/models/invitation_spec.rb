require 'rails_helper'

RSpec.describe Invitation, type: :model do
  describe "model validation" do
    context "when not valid" do     
      let(:invitation_without_email){ build :invitation_without_email}
      let(:invitation_with_invalid_email){ build :invitation_with_invalid_email}

      it "lacks email" do
        expect(invitation_without_email).to_not be_valid
        expect(invitation_without_email.errors["email"]).to include("can't be blank")
      end

      it "has invalid email" do 
        expect(invitation_with_invalid_email).to_not be_valid
        expect(invitation_with_invalid_email.errors["email"]).to include("please input a valid email")
      end
    end

    context "when valid" do
      subject { create :valid_invitation }

      it { is_expected.to be_valid }
    end
  end

  describe "#save" do
    subject { create :valid_invitation }

    context "when invitation is created" do
      it "creates unique token" do
        expect(subject.oauth_token).to be_present
      end

      it "creates token expiration date one week later" do
        expect(subject.expiration_date).to match(DateTime.now + 7)
      end
    end
  end
end
