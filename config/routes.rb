# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[show create] do
        collection do
          get :search
          get '/me', to: 'users#show_me'
          patch '/me', to: 'users#update_me'
        end
        member do
          get :posts
        end
      end
      resources :posts, only: %i[index show create update destroy] do
        collection do
          get :recent
        end
        resources :comments, only: [:create]
        resources :likes, only: [:create] do
          collection do
            delete '', to: 'likes#destroy'
          end
        end
        member do
          get '/is_liked', to: 'likes#liked?'
        end
      end
    end
  end

  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
