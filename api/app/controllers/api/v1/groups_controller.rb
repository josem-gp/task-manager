class Api::V1::GroupsController < ApplicationController
  before_action :find_group, except: [:index, :create]
  before_action :skip_authorization, only: [:index, :create]

  # Fetch all the groups of the current user
  # GET /api/v1/groups
  def index
    groups = current_user.groups # we don't need the auth check because we already fetch only the groups of the current user in the backend
    render json: { groups: groups }
  end

  # Fetch one of the groups of the current user
  # GET /api/v1/groups/:id
  def show
    render json: { group: @group }
  end

  # Create a group
  # POST /api/v1/groups
  def create
    group = Group.new(group_params) # we don't need the auth check because any user can create a group
    group.admin = current_user
    if group.save
      render json: { group: group , message: "The group was successfully created" }
    else
      error_message = group.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Update a group only if current user is admin of group
  # PATCH /api/v1/groups/:id
  def update
    if @group.update(group_params)
      render json: { group: @group , message: "The group was successfully updated" }
    else
      error_message = @group.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Destroy a group only if current user is admin of group
  # DELETE /api/v1/groups/:id
  def destroy
    if @group.destroy
      render json: { message: "The group was successfully deleted" }
    else 
      render_error("The group couldn't be deleted", :bad_request)
    end
  end

  # Filter tasks thats belong to the group and whose user is either the creator or assignee
  # POST /api/v1/groups/:id/filter_tasks
  def filter_tasks
    response = Task.filter(filter_params).where(group: @group).and(Task.where(user: current_user).or(Task.where(assignee: current_user)))
    render json: { tasks: response }
  end

  # Sends invitation to lead only if current user is admin of group
  # POST /api/v1/groups/:id/send_invitation
  def send_invitation
    invitation = Invitation.new(invitation_params)
    invitation.sender = current_user
    invitation.group = @group
    if invitation.save
      # We send the invitation mailer
      InvitationMailer.with(recipient: invitation.email, sender: invitation.sender, group: invitation.group).send_invite.deliver_later
      # We also enqueue the job to disable the invitation in a week
      DisableInvitationJob.set(wait_until: Date.tomorrow.noon + 7.days).perform_later(invitation: invitation)
      render json: { message: "The invitation was successfully sent" }
    else
      render_error("The invitation couldn't be created", :bad_request)
    end
  end

  # Deletes user in the group only if current user is admin of group
  # DELETE /api/v1/groups/:id/remove_user/:user_id
  def remove_user
    member = Membership.find_by(user: params[:user_id], group: params[:id])
    if member.destroy
      render json: { message: "The user was successfully removed" }
    else 
      render_error("The user couldn't be removed", :bad_request)
    end
  end

  private

  def find_group
    @group = Group.find(params[:id])
    authorize @group, policy_class: Api::V1::GroupPolicy
  end

  def group_params
    params.require(:group).permit(:name, :description)
  end

  def invitation_params
    params.require(:invitation).permit(:email)
  end

  def filter_params
    params.permit(:by_fuzzy_name, :by_assignee_id, :by_finished, :from_due_date, :to_due_date)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end
