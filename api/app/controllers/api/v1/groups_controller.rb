class Api::V1::GroupsController < ApplicationController
  before_action :find_group, only: [ :send_invitation, :show ]
  before_action :skip_authorization, only: [ :index, :create ]

  # GET /api/v1/groups
  def index
    @groups = current_user.groups
    render json: { groups: @groups }
  end

  # GET /api/v1/groups/:id
  def show
    authorize @group
    render json: { group: @group }
  end

  # POST /api/v1/groups
  def create
    @group = Group.new(group_params)
    @group.admin = current_user
    if @group.save
      render json: { group: @group , message: "The group was succesfully created" }
    else
      error_message = @group.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  rescue => e
    logger.warn e
    render_error("The group couldn't be created", :bad_request)
  end

  # Sends invitation
  def send_invitation
    @invitation = Invitation.new(invitation_params)
    if current_user.admin?
      @invitation.sender = current_user
      @invitation.group = @group
      if @invitation.save
        # We send the invitation mailer
        InvitationMailer.with(recipient: @invitation.email, sender: @invitation.sender, group: @invitation.group).send_invite.deliver_later
        # We also enqueue the job to disable the invitation in a week
        DisableInvitationJob.set(wait: 1.week).perform_later(@invitation)
      end
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

  def group_params
    params.require(:group).permit(:name, :description)
  end

  def invitation_params
    params.require(:invitation).permit(:email)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end
