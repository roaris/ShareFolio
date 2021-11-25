# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include Firebase::Auth::Authenticable

  before_action :check_xhr_header, except: :fallback_index_html
  before_action :authenticate_user, except: :fallback_index_html

  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end

  def check_xhr_header
    return if request.xhr?

    render status: :forbidden
  end
end
