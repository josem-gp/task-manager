require 'rails_helper'

RSpec.describe Api::V1::GroupPolicy, type: :policy do
  subject { described_class.new(user, group) }

  let(:group) { create :group }

  context "for a user that is not part of the group" do
    let(:user) { create :user }

    it { should_not authorize(:show)    }
    it { should_not authorize(:update)  }
    it { should_not authorize(:destroy) }
    it { should_not authorize(:filter_tasks) }
    it { should_not authorize(:send_invitation) }
    it { should_not authorize(:remove_user) }
    it { should_not authorize(:fetch_users)    }
  end

  context "for a user that is part of the group" do
    let(:user) { create :user }

    before do
      create :membership, user: user, group: group
    end

    it { should authorize(:show)    }
    it { should_not authorize(:update)  }
    it { should_not authorize(:destroy) }
    it { should authorize(:filter_tasks) }
    it { should_not authorize(:send_invitation) }
    it { should_not authorize(:remove_user) }
    it { should authorize(:fetch_users)    }
  end

  context "for the admin of the group" do
    let(:user) { group.admin }

    it { should authorize(:show)    }
    it { should authorize(:update)  }
    it { should authorize(:destroy) }
    it { should authorize(:filter_tasks) }
    it { should authorize(:send_invitation) }
    it { should authorize(:remove_user) }
    it { should authorize(:fetch_users)    }
  end
end
