Rails.application.routes.draw do
  
  root to: "welcome#index"

  get "/trips/:trip_id/check_points/new" => "check_points#new"

  get '/login', to: 'sessions#new'

  get '/logout', to: 'sessions#destroy'

  get '/auth/facebook/callback', to: 'sessions#create'

  # resources :trips #do 
  resources :check_points
  resources :trips
  #end

  resources :users
  resources :sessions, only: [:new, :create, :destroy]
end
