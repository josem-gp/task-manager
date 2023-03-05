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
      resources :groups, only: [:index, :show, :create, :update, :destroy] do
        member do
          post 'send_invitation', to: 'groups#send_invitation'
          post 'filter_tasks', to: 'groups#filter_tasks'
          delete "remove_user/:user_id", to: "groups#remove_user", as: :remove_group_user
        end
        resources :tasks, only: [:index, :create], module: :groups
        resources :tags, only: [:index, :create, :update, :destroy]
        resources :invitations, only: [:index]
        resources :users, only: [:index]
      end
      resources :tasks, only: [:index, :show, :create, :update, :destroy]
      get 'invitation_signup/:token', to: 'invitations#invitation_signup'
      get 'search_tasks/:search_id', to: 'users#search_tasks', as: :search_user_tasks
    end
  end
  mount Sidekiq::Web => '/sidekiq'
end
