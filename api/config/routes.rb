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
      resources :users, only: [:update] do
        member do
          get 'search_tasks/:search_id' => 'users#search_tasks'
        end
      end

      resources :groups, only: [:index, :show, :create, :update, :destroy] do
        member do
          post 'send_invitation' => 'groups#send_invitation'
          get 'fetch_group_users' => 'groups#fetch_group_users'
          get 'filter_tasks' => 'groups#filter_tasks'
          delete "remove_user/:user_id" => "groups#remove_user"
        end
        resources :tasks, only: [:index, :create], module: :groups
        resources :tags, only: [:index, :create, :update, :destroy]
        resources :invitations, only: [:index]
      end

      resources :tasks, only: [:index, :show, :create, :update, :destroy]

      get 'invitation_signup/:token' => 'invitations#invitation_signup'
    end
  end
  mount Sidekiq::Web => '/sidekiq'
end
