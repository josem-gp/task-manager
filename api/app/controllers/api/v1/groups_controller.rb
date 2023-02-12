class Api::V1::GroupsController < ApplicationController
  before_action :find_group, only: [ :send_invitation ]

  def index
    render json: { status: 200, message: "Hello World!"}
  end

  # Sends invitation
  def send_invitation
    @invitation = Invitation.new(invitation_params)
    if current_user.admin?
      @invitation.sender = current_user
      @invitation.group = @group
      @invitation.save
      InvitationMailer.with(recipient: @invitation.email, sender: @invitation.sender, group: @invitation.group).send_invite.deliver_later
    else
      render_permission_error
    end
  rescue => e
    logger.warn e
  end

  private

  def find_group
    @group = Group.find(params[:id])
  end

  def invitation_params
    params.require(:invitation).permit(:email)
  end

  def render_permission_error
    auth_error = {
      error: "You don't have the permissions to send an invitation",
      status: 400
    }
    render json: auth_error, status: :unprocessable_entity
  end
end
