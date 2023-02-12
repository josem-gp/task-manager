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
end
