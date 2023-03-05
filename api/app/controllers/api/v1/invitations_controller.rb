class Api::V1::InvitationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :invitation_signup ]
  before_action :find_group, only: [:index]
  before_action :oauth_token_confirmation, only: [:invitation_signup]

  # Fetch all the invitations of the group
  # GET /api/v1/groups/:group_id/invitations
  def index
    @invitations = @group.invitations
    authorize @invitations
    render json: { invitations: @invitations }
  end

  # Render signup page or redirects to root path after user clicks on invitation link
  # GET /api/v1/invitation_signup/:token
  def invitation_signup
    unless @invitation.disabled 
      @invitation.disabled = true 
      @invitation.save!
      # We add the group id in the session so that when the user is signed up, we create a membership automatically in that group
      session[:group] = @invitation.group.id
      # We redirect to sign up page with the email set already for the user
      redirect_to new_user_session_path(email: @invitation.email)
    else
      render json: { message: "The invitation has expired already" }, status: :found, location: new_user_session_path  # render homepage
    end
  end

  private 

  def find_group
    @group = Group.find(params[:group_id])
  end

  # Fetch invitation and check if the expired date has passed
  def oauth_token_confirmation
    @invitation = Invitation.find_by(oauth_token: params[:token])
    unless Date.current < @invitation.expiration_date
      @invitation.disabled = true 
      @invitation.save!
    end
    return @invitation
  end
end
