require 'sidekiq/web'
# Configure Sidekiq-specific session middleware
Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: "_interslice_session"

Rails.application.routes.draw do

  devise_for :users,
             controllers: {
                 sessions: 'users/sessions',
                 registrations: 'users/registrations'
             }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :groups, only: [ :index ] do
        member do
          post 'send_invitation' => 'groups#send_invitation'
        end
      end
      get 'invitation_signup/:token' => 'invitations#invitation_signup'
    end
  end
  mount Sidekiq::Web => '/sidekiq'
end
