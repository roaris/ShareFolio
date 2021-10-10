# frozen_string_literal: true

if Rails.env.production?
  Rails.application.config.session_store :cookie_store, key: '_react_rails', domain: ENV['FRONTEND_ORIGIN']
else
  Rails.application.config.session_store :cookie_store, key: '_react_rails'
end
