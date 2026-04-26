Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  resources :users
  resources :users_tests

  
  # resources :users do
  #   resources :users_tests, only: [:new, :create, :index, :show]
  # end
  # resources :users_tests, only: [:show, :index, :update]

end
