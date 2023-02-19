require 'rails_helper'

RSpec.describe Group, type: :model do
  describe "model validation" do
    subject { create :valid_group }

    context "when not valid" do     
      let(:group_without_name) {build :group_without_name }
      let(:group_with_invalid_name) { build :group_with_invalid_name }
      let(:group_with_invalid_description) {build :group_with_invalid_description }

      it "lacks name" do
        expect(group_without_name).to_not be_valid
        expect(group_without_name.errors["name"]).to include("can't be blank")
      end

      it "has invalid name" do 
        expect(group_with_invalid_name).to_not be_valid
        expect(group_with_invalid_name.errors["name"]).to include("is too short (minimum is 2 characters)")
      end

      it "has invalid description" do
        expect(group_with_invalid_description).to_not be_valid
        expect(group_with_invalid_description.errors["description"]).to include("is too long (maximum is 30 characters)")
      end
    end

    context "when valid" do
      it { is_expected.to be_valid }
    end
  end

  describe "#save" do
    subject { create :valid_group }

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
      expect { create :valid_group }.to change { Membership.count }.by(1)
    end
  end
end
