require 'rails_helper'

RSpec.describe DisableInvitationJob, type: :job do
  subject(:job) { described_class.perform_later(invitation) }

  let(:invitation) { create :invitation }

  it 'enqueues the job' do
    expect { job }.to have_enqueued_job(described_class)
      .with(invitation)
      .on_queue("default")
  end

  it 'disables the invitation' do
    described_class.perform_now(invitation)
    expect(invitation.disabled).to eq true
  end
end
