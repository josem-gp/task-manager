class UserConfirmationMailer < ApplicationMailer

  # We call this method when user has signed up 
  def user_registration_email
    @user = params[:user]

    mail(to: @user.email, subject: "Welcome to #{ENV['APP_NAME']}!")
  end
end
