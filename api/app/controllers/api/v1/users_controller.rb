class Api::V1::UsersController < ApplicationController
  before_action :find_user, only: [:update]

  # Update a user 
  # PATCH /api/v1/users/:id
  def update
    if user_params[:password].present? && user_params[:password_confirmation].present?
      # Update the password
      if @user.update_with_password(user_params)
        bypass_sign_in(@user) # Sign in the user bypassing validation in case their password changed
        render json: { 
          userObject: build_user_json(@user), 
          message: "The user was successfully updated"
        }
      else
        error_message = @user.errors.objects.first.full_message
        render_error(error_message, :bad_request)
      end
    else
      # Update the user without updating the password
      if @user.update(user_params.except(:current_password, :password, :password_confirmation))
        render json: { 
          userObject: build_user_json(@user), 
          message: "The user was successfully updated"
        }
      else
        error_message = @user.errors.objects.first.full_message
        render_error(error_message, :bad_request)
      end
    end
  end

  # Get user information
  # GET /api/v1/users/fetch_user_info
  def fetch_user_info
    user_tasks = Task.where(user: current_user).or(Task.where(assignee: current_user))
    all_icons = Icon.all
    
    render json: { 
      userObject: build_user_json(current_user), 
      userGroups: except_attributes(current_user.groups, ['created_at', 'updated_at']),
      userTasks: build_task_json(user_tasks),
      allIcons: select_attributes(all_icons, ['id', 'name', 'url']),
    }
  end

  private

  def find_user
    @user = User.find(params[:id])
    authorize @user, policy_class: Api::V1::UserPolicy
  end

  def user_params
    params.require(:user).permit(:username, :icon_id, :current_password, :password, :password_confirmation)
  end
end