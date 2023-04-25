class Api::V1::InvitationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :invitation_signup ]
  before_action :oauth_token_confirmation, only: [:invitation_signup]

  # Render signup page or redirects to root path after user clicks on invitation link
  # GET /api/v1/invitation_signup/:token
  def invitation_signup
    unless @invitation.disabled 
      @invitation.disabled = true 
      @invitation.save!
      # We add the group id in the session so that when the user is signed up, we create a membership automatically in that group
      session[:group] = @invitation.group.id
      # We redirect to sign up page with the email set already for the user
      redirect_to "#{ENV['SHOP_FRONTEND_URL']}/signup?email=#{CGI.escape(@invitation.email)}"
    else
      render json: { message: "The invitation has expired already" }, status: :found, location: ENV['SHOP_FRONTEND_URL']  # render homepage
    end
  end

  # Cancel invitation by doing a logical delete
  def disable_invitation
    @invitation = Invitation.find(params[:id])
    authorize @invitation, policy_class: Api::V1::InvitationPolicy # check the user is the sender (since sender can only be admin)

    # Disable invitation
    @invitation.disabled = true 
    if @invitation.save!
      # Find the scheduled job by its arguments
      scheduled_set = Sidekiq::ScheduledSet.new
      scheduled_job = scheduled_set.detect do |job|
        job.klass == "ActiveJob::QueueAdapters::SidekiqAdapter::JobWrapper" &&
          job.args[0]["job_class"] == "DisableInvitationJob" &&
          job.args[0]["arguments"][0]["invitation"]["_aj_globalid"] == "gid://api/Invitation/#{@invitation.id}"
      end

      # Delete the scheduled job if it exists
      scheduled_job.delete if scheduled_job

      render json: { message: "The invitation was successfully removed" }
    else
      render_error("The invitation couldn't be removed", :bad_request)
    end
  end

  private 

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
