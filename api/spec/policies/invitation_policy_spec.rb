require 'rails_helper'

RSpec.describe InvitationPolicy, type: :policy do
  subject { described_class.new(user, invitation) }

  let(:group) { create :group }
  let(:invitation) { create :invitation, sender: user, group: group } 

  context "for a user that is not part of the group" do
    let(:user) { create :user }

    it { should_not authorize(:index)    }
  end

  context "for a user that is part of the group" do
    let(:user) { create :user }

    before do
      create :membership, user: user, group: group
    end

    it { should authorize(:index) }
  end

  context "for the admin of the group" do
    let(:user) { group.admin }

    it { should authorize(:index)    }
  end
end
