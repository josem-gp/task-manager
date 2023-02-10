class Api::V1::InvitationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :invitation_signup ]
  before_action :oauth_token_confirmation

  # Render signup page or redirects to root path
  def invitation_signup
    unless @invitation.disabled 
      render json: { status: 200, message: "Hello World!"} # render sign up page with email added (pass params in controller for group_id of the invitation)
      @invitation.disabled = true 
      @invitation.save!
    else
      redirect_to new_user_session_path # render homepage
    end
  rescue => e
    logger.warn e
    redirect_to new_user_session_path # render homepage
  end

  # Sends invitation
  def send_invitation
    @invitation = Invitation.new(invitation_params)
    if current_user.admin?
      @invitation.sender = current_user
  ##### This cannot be current_user.group. We need to take the group from the params (pass it in the form hidden or something)
      @invitation.group = current_user.group 
      @invitation.save
      InvitationMailer.with(recipient: @invitation.email, sender: current_user).send_invite.deliver_now
    else
      render_permission_error
    end
  rescue => e
    logger.warn e
    render_operation_error(e)
  end

  private 

  # Fetch invitation and check if the expired date has passed
  def oauth_token_confirmation
    @invitation = Invitation.find_by(oauth_token: params[:token])
    unless Date.today < @invitation.expiration_date
      @invitation.disabled = true 
      @invitation.save!
    end
  rescue => e
    logger.warn e
    return @invitation
  end

  def invitation_params
  ##### Here I need to get the group as well maybe?
    params.require(:invitation).permit(:email)
  end

  def render_permission_error
    auth_error = {
      error: "You don't have the permissions to send an invitation",
      status: 400
    }
    render json: auth_error, status: :unprocessable_entity
  end

  def render_operation_error(e)
    operation_error = {
      error: e,
      status: 400
    }
    render json: operation_error, status: :unprocessable_entity
  end
end