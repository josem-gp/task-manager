class Api::V1::GroupsController < ApplicationController
  before_action :find_group, except: [:create]
  before_action :skip_authorization, only: [:create]

  # Fetch one of the groups of the current user
  # GET /api/v1/groups/:id
  def show
    users = @group.users
    tasks = @group.tasks
    tags = @group.tags
    invitations = @group.invitations
    
    render json: { 
      group: except_attributes(@group, ['created_at', 'updated_at']),
      groupUsers: build_user_json(users),
      groupTags: except_attributes(tags, ['created_at', 'updated_at']),
      groupInvitations: except_attributes(invitations, ['oauth_token', 'created_at', 'updated_at'])
    }
  end

  # Create a group
  # POST /api/v1/groups
  def create
    group = Group.new(group_params) # we don't need the auth check because any user can create a group
    group.admin = current_user
    if group.save
      render json: { 
        group: except_attributes(group, ['created_at', 'updated_at']), 
        message: "The group was successfully created" 
      }
    else
      error_message = group.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Update a group only if current user is admin of group
  # PATCH /api/v1/groups/:id
  def update
    if @group.update(group_params)
      render json: { 
        group: except_attributes(@group, ['created_at', 'updated_at']), 
        message: "The group was successfully updated" 
      }
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
    filtered_tasks = Task.filter(filter_params).where(group: @group)
    if filtered_tasks.empty?
      render_error("There are no matches for your search", :not_found)
    else
      render json: { task_value: build_task_json(filtered_tasks), message: "The tasks have been filtered" }
    end
  end

  # Sends invitation to lead only if current user is admin of group
  # POST /api/v1/groups/:id/send_invitation
  def send_invitation
    invitation = Invitation.new(invitation_params)
    invitation.sender = current_user
    invitation.group = @group
    if invitation.save # We already do the (group) Pundit auth check on sender being admin of the group we are sending it from
      # We send the invitation mailer
      InvitationMailer.with(recipient: invitation.email, sender: invitation.sender, url: invitation.oauth_token).send_invite.deliver_later
      # We also enqueue the job to disable the invitation in a week
      DisableInvitationJob.set(wait_until: Date.tomorrow.noon + 7.days).perform_later(invitation: invitation)
      render json: { 
        invitation: except_attributes(invitation, ['oauth_token', 'created_at', 'updated_at']),
        message: "The invitation was successfully sent" 
      }
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
    # The assignee_id works both as a string and number
    params.permit(:by_fuzzy_name, :by_owner_id,  :by_assignee_id, :by_status, :from_due_date, :to_due_date)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end
