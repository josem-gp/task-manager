class Api::V1::UsersController < ApplicationController
  before_action :find_user, only: [:update]

  # Update a user 
  # PATCH /api/v1/users/:id
  def update
    if @user.update(user_params)
      render json: { user: @user , message: "The user was successfully updated" }
    else
      error_message = @user.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  private

  def find_user
    @user = User.find(params[:id])
    authorize @user
  end

  def user_params
    params.require(:user).permit(:username, :icon_id)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end