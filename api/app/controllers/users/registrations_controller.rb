class Users::RegistrationsController < Devise::RegistrationsController
  include ApiHelper
  respond_to :json

  # Users sign up
  # POST /users
  def create
    group_name = sign_up_params[:groups_as_admin_attributes]&.first&.dig(:name)
    
    @user = User.new(sign_up_params.except(:groups_as_admin_attributes))

    unless session[:group]
      @user.groups_as_admin.build(name: group_name, admin: @user)
    end

    ActiveRecord::Base.transaction do
      @user.save!
    end
    
    if @user.persisted? && session[:group]      
      Membership.create!(user: @user, group: Group.find(session[:group]))
      reset_session
    end

    sign_in(@user) # sign in the user
    
    respond_with(@user)
  rescue ActiveRecord::RecordInvalid => e
    respond_with(@user)
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

  def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, groups_as_admin_attributes: [:name])
  end
end
