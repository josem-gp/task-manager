require 'rails_helper'

RSpec.describe Api::V1::Groups::TaskPolicy, type: :policy do
  subject { described_class.new(user, task) }

  let(:group) { create :group }
  let(:task) { create :task, user: user, group: group } 

  context "for a user that is not part of the group" do
    let(:user) { create :user }

    it { should_not authorize(:create) }
  end

  context "for a user that is part of the group" do
    let(:user) { create :user }

    before do
      create :membership, user: user, group: group
    end

    it { should authorize(:create) }
  end

  context "for the admin of the group" do
    let(:user) { group.admin }

    it { should authorize(:create) }
  end
end
