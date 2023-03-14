# Preview all emails at http://localhost:3000/rails/mailers/user_confirmation_mailer
class UserConfirmationMailerPreview < ActionMailer::Preview
  def user_registration_email
    # Set up a temporary user for the preview
    user = User.new(username: "jose", email: "jose@test.io", password: "123456")

    UserConfirmationMailer.with(user: user).user_registration_email
  end
end
