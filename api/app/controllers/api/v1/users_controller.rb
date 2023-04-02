class Api::V1::UsersController < ApplicationController
  before_action :find_user, only: [:update, :fetch_user_info]
  before_action :find_all_user_tasks, only: [:fetch_user_info]

  # Update a user 
  # PATCH /api/v1/users/:id
  def update
    if @user.update(user_params)
      render json: { 
        user: select_attributes(current_user, ['id', 'username', 'email', 'icon_id']), 
        message: "The user was successfully updated"
      }
    else
      error_message = @user.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Get user information
  # GET /api/v1/users/:user_id/fetch_user_info
  def fetch_user_info
    render json: { 
      user: select_attributes(current_user, ['id', 'username', 'email', 'icon_id']), 
      userGroups: except_attributes(@user.groups, ['created_at', 'updated_at']),
      userTasks: build_json(@user_tasks),
    }
  end

  private

  def find_user
    @user = User.find(params[:id])
    authorize @user, policy_class: Api::V1::UserPolicy
  end

  def find_all_user_tasks
    @user_tasks = Task.where(user: @user).or(Task.where(assignee: @user))
  end

  def user_params
    params.require(:user).permit(:username, :icon_id)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end