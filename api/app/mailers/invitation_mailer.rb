class InvitationMailer < ApplicationMailer

  # We call this method when admin of a group sends an invite
  def send_invite
    @recipient= params[:recipient]
    @sender= params[:sender]
    @url= params[:url]

    mail(to: @recipient, subject: "You have been invited to #{ENV['APP_NAME']}!")
  end
end
