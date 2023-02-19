require "rails_helper"

RSpec.describe UserConfirmationMailer, type: :mailer do
  describe "#user_registration_email" do

    let(:user) { create(:valid_user) }
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
      expect(mail.body.encoded).to match("Welcome to #{ENV['APP_NAME']}!")
    end

    it 'assigns @user' do
      expect(mail.body.encoded).to match("We are glad to have you here #{user.username}")
    end
  end
end