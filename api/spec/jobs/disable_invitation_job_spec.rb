require 'rails_helper'

RSpec.describe DisableInvitationJob, type: :job do
  let(:invitation) { create :invitation }

  it 'disables the invitation' do
    described_class.perform_now(invitation)
    expect(invitation.disabled).to eq true
  end
end
