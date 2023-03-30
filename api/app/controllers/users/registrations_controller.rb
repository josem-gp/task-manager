class Users::RegistrationsController < Devise::RegistrationsController
  include ApiHelper
  respond_to :json

  # Users sign up
  # POST /users
  def create
    super
    if @user
      # We create a membership to the group if the user had it in the session (it means that it was invited)
      Membership.create(user: @user, group: Group.find(session[:group])) if session[:group]
      # We remove the existing session
      reset_session
    end
  end

  private

  def respond_with(resource, _opts = {})
    resource.persisted? ? register_success : register_failed
  end

  def register_success
    render json: { message: "Signed up succesfully", user: select_attributes(current_user, ['id', 'username', 'email', 'icon_id']) }
  end

  def register_failed
    render json: { message: "There was an error when trying to sign up" }, status: :bad_request
  end
end
