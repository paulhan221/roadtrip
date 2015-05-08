Rails.application.routes.draw do
  
  resources :trips do 
    resources :check_points
  end
  resources :users
  
  root to: "welcome#index"

  resources :sessions, only: [:new, :create, :destroy]

  get '/login', to: 'sessions#new'

  get '/logout', to: 'sessions#destroy'

  get '/auth/facebook/callback', to: 'sessions#create'
end
