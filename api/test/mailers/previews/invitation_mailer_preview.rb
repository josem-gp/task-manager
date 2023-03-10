# Preview all emails at http://localhost:3000/rails/mailers/invitation_mailer
class InvitationMailerPreview < ActionMailer::Preview
  def send_invite
    # Set up a temporary user for the preview
    sender = User.new(username: "jose", email: "jose@test.io", password: "123456")
    group = Group.new(name: "Test Group One", description: "blablabla", admin: sender)
    recipient = "saki@test.io"

    InvitationMailer.with(recipient: recipient, sender: sender, group: group).send_invite
  end
end
