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
      resources :users, only: [:update]
      resources :groups, only: [:show, :create, :update, :destroy] do
        member do
          get 'fetch_users', to: 'groups#fetch_users'
          post 'send_invitation', to: 'groups#send_invitation'
          post 'filter_tasks', to: 'groups#filter_tasks'
          delete "remove_user/:user_id", to: "groups#remove_user", as: :remove_group_user
        end
        resources :tasks, only: [:index, :create], module: :groups # we only need these 2 actions to be done inside a group (this way if we are inside a group the group_id will be already given to the user by default)
        resources :tags, only: [:index, :create, :update, :destroy]
        resources :invitations, only: [:index]
      end
      resources :tasks, only: [:show, :create, :update, :destroy]
      get 'invitation_signup/:token', to: 'invitations#invitation_signup'
      delete 'disable_invitation/:id', to: 'invitations#disable_invitation'
      get 'users/fetch_user_info', to: 'users#fetch_user_info'
    end
  end
  mount Sidekiq::Web => '/sidekiq'
end
