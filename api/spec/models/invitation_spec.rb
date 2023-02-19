require 'rails_helper'

RSpec.describe Invitation, type: :model do
  describe "model validation" do
    subject { create :invitation }

    context "when not valid" do     
      it "lacks email" do
        subject.email = nil
        expect(subject).to_not be_valid
        expect(subject.errors["email"]).to include("can't be blank")
      end

      it "has invalid email" do 
        subject.email = "factorytest.io"
        expect(subject).to_not be_valid
        expect(subject.errors["email"]).to include("please input a valid email")
      end
    end

    context "when valid" do
      it { is_expected.to be_valid }
    end
  end

  describe "#save" do
    subject { create :invitation }

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
