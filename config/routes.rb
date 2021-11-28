# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get '/users/me', to: 'users#show_me'
      patch '/users/me', to: 'users#update_me'
      resources :users, only: %i[show create] do
        collection do
          get :search
        end
      end
      resources :posts, only: %i[index show create update destroy] do
        collection do
          get :recent
        end
        resources :comments, only: [:create]
      end
    end
  end

  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
