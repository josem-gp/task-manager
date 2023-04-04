require 'rails_helper'

RSpec.describe Api::V1::TagPolicy, type: :policy do
  subject { described_class.new(user, tag) }

  let(:group) { create :group }
  let(:tag) { create :tag, user: user, group: group } 

  context "for a user that is not part of the group" do
    let(:user) { create :user }

    it { should_not authorize(:create)  }
    it { should_not authorize(:update)  }
    it { should_not authorize(:destroy) }
  end

  context "for a user that is part of the group" do
    let(:user) { create :user }

    before do
      create :membership, user: user, group: group
    end

    it { should authorize(:create)  }
    it { should authorize(:update)  }
    it { should authorize(:destroy) }
  end

  context "for the admin of the group" do
    let(:user) { group.admin }

    it { should authorize(:create)  }
    it { should authorize(:update)  }
    it { should authorize(:destroy) }
  end
end
