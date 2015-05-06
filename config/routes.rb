Rails.application.routes.draw do
  resources :trips
  resources :users
  resources :check_points
  
  root to: "welcome#index"

  resources :sessions, only: [:new, :create, :destroy]

  get '/login', to: 'sessions#new'

  get '/logout', to: 'sessions#destroy'

  get '/auth/facebook/callback', to: 'sessions#create'
end
