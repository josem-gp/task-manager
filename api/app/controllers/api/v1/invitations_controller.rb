class Api::V1::InvitationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :invitation_signup ]
  before_action :find_group, only: [:index]
  before_action :oauth_token_confirmation, only: [:invitation_signup]

  # Fetch all the invitations of the group
  # GET /api/v1/groups/:group_id/invitations
  def index
    invitations = @group.invitations
    render json: { invitations: invitations }
  end

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

  private 

  def find_group
    @group = Group.find(params[:group_id])
    authorize @group
  end

  # Fetch invitation and check if the expired date has passed
  def oauth_token_confirmation
    @invitation = Invitation.find_by(oauth_token: params[:token])
    unless Date.current < @invitation.expiration_date
      @invitation.disabled = true 
      @invitation.save!
    end
  rescue => e
    logger.warn e
    return @invitation
  end
end
