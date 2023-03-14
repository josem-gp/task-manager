require "rails_helper"

RSpec.describe UserConfirmationMailer, type: :mailer do
  describe "#user_registration_email" do

    let(:user) { create(:user) }
    let(:mail) { described_class.with(user: user).user_registration_email }

    it "renders the subject" do
      expect(mail.subject).to eq("Welcome to #{ENV['APP_NAME']}!")
    end

    it 'renders the receiver email' do
      expect(mail.to).to eq([user.email])
    end

    it 'renders the sender email' do
      expect(mail.from).to eq(['test.ror.mailing@gmail.com'])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("We are excited to welcome you to #{ENV['APP_NAME']}, your ultimate task management solution.")
    end

    it 'assigns @user' do
      expect(mail.body.encoded).to match("Dear #{user.username},")
    end
  end
end
