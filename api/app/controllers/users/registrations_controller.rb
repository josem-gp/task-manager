class Users::RegistrationsController < Devise::RegistrationsController
  include ApiHelper
  respond_to :json

  # Users sign up
  # POST /users
  def create
    super do |resource|
      @user = resource
    end

    # We create a membership to the group if the user had it in the session (it means that it was invited)
    if @user.persisted? && session[:group]      
      Membership.create!(user: @user, group: Group.find(session[:group]))
      # We remove the existing session
      reset_session
    end
  end

  private

  def respond_with(resource, _opts = {})
    resource.persisted? ? register_success : register_failed(resource)
  end

  def register_success
    render json: { message: "Signed up succesfully", userObject: build_user_json(current_user) }
  end

  def register_failed(resource)
    error_message = resource.errors.objects.first.full_message
    render json: { message: error_message }, status: :bad_request
  end
end
