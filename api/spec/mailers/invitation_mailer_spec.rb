require "rails_helper"

RSpec.describe InvitationMailer, type: :mailer do
  describe "#send_invite" do

    let(:invitation) { create(:invitation) }
    let(:mail) { described_class.with(recipient: invitation.email, sender: invitation.sender, group: invitation.group).send_invite }

    it "renders the subject" do
      expect(mail.subject).to eq("You have been invited to #{ENV['APP_NAME']}!")
    end

    it 'renders the receiver email' do
      expect(mail.to).to eq([invitation.email])
    end

    it 'renders the sender email' do
      expect(mail.from).to eq(['test.ror.mailing@gmail.com'])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("You have been invited!")
    end

    it 'assigns @sender' do
      expect(mail.body.encoded).to match("you have been invited by #{invitation.sender.username} to join their #{ENV['APP_NAME']} group")
    end
  end
end
