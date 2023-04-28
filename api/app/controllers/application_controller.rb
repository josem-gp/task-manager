class ApplicationController < ActionController::API
  include Pundit::Authorization
  include ApiHelper
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from Pundit::NotAuthorizedError,   with: :user_not_authorized
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def configure_permitted_parameters
    # Permit the `username` parameter along with the other user parameters
    # (https://www.rubydoc.info/github/plataformatec/devise/Devise/ParameterSanitizer)
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:username, :email, :password, :password_confirmation, groups_as_admin_attributes: [:name])
    end
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end

  private

  def user_not_authorized(exception)
    render json: {
      message: "Unauthorized access or action"
    }, status: :unauthorized
  end

  def not_found(exception)
    render json: { message: "Record not found" }, status: :not_found
  end
end
