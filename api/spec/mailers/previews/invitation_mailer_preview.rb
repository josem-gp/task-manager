# Preview all emails at http://localhost:3000/rails/mailers/invitation_mailer
class InvitationMailerPreview < ActionMailer::Preview
  def send_invite
    # Set up a temporary user for the preview
    user = User.new(username: "jose", email: "jose@test.io", password: "123456")
    group = Group.new(name: "Test Group One", description: "blablabla", admin: user)
    invitation = Invitation.new(email: "saki@test.io", sender: user, group: group, oauth_token: "9EFRCh8guTsvssQwZrPd4StFR7Em8moBSvaB")

    InvitationMailer.with(recipient: invitation.email, sender: invitation.sender, url: invitation.oauth_token).send_invite
  end
end
