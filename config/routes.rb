# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users do
        collection do
          get :me
        end
      end
      resources :sessions do
        collection do
          get :logged_in
        end
      end
      resources :posts
    end
  end

  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
