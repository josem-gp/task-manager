require 'rails_helper'

RSpec.describe Api::V1::UserPolicy, type: :policy do
  subject { described_class.new(current_user, user) }

  let(:current_user) { create :user }

  context "for a user that is not the current user" do
    let(:user) { create :user }

    it { should_not authorize(:update)  }
  end

  context "for the current user" do
    let(:user) { current_user }

    it { should authorize(:update)  }
  end
end
