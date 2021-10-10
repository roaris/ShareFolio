# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  before_action :check_xhr_header

  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_login
    return if current_user

    render status: :unauthorized
  end

  def check_xhr_header
    return if request.xhr?

    render status: :forbidden
  end
end
