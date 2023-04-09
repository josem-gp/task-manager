class Api::V1::UsersController < ApplicationController
  before_action :find_user, only: [:update]

  # Update a user 
  # PATCH /api/v1/users/:id
  def update
    if @user.update(user_params)
      render json: { 
        user: build_user_json(@user), 
        message: "The user was successfully updated"
      }
    else
      error_message = @user.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Get user information
  # GET /api/v1/users/fetch_user_info
  def fetch_user_info
    user_tasks = Task.where(user: current_user).or(Task.where(assignee: current_user))
    
    render json: { 
      userObject: build_user_json(current_user), 
      userGroups: except_attributes(current_user.groups, ['created_at', 'updated_at']),
      userTasks: build_task_json(user_tasks),
    }
  end

  private

  def find_user
    @user = User.find(params[:id])
    authorize @user, policy_class: Api::V1::UserPolicy
  end

  def user_params
    params.require(:user).permit(:username, :icon_id)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end