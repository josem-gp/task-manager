require 'rails_helper'

RSpec.describe Group, type: :model do
  describe "model validation" do
    subject { create :group }

    context "when not valid" do     
      it "lacks name" do
        subject.name = nil
        expect(subject).to_not be_valid
        expect(subject.errors["name"]).to include("can't be blank")
      end

      it "has invalid name" do
        subject.name = "a" 
        expect(subject).to_not be_valid
        expect(subject.errors["name"]).to include("is too short (minimum is 2 characters)")
      end

      it "has invalid description" do
        subject.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        expect(subject).to_not be_valid
        expect(subject.errors["description"]).to include("is too long (maximum is 30 characters)")
      end
    end

    context "when valid" do
      it { is_expected.to be_valid }
    end
  end

  describe "#save" do
    subject { create :group }

    context "when group is created" do
      let(:membership) { Membership.find_by(group: subject) }

      it "creates membership for admin" do
        expect(membership.group).to eq(subject)
        expect(membership.user).to eq(subject.admin)
      end
    end
  end

  describe "#total_memberships" do
    it "counts memberships for a group" do
      expect { create :group }.to change { Membership.count }.by(1)
    end
  end
end
