# frozen_string_literal: true

module Api
  module V1
    class SessionsController < ApplicationController
      def create
        user = User.find_by(email: params[:session][:email])

        if user&.authenticate(params[:session][:password])
          session[:user_id] = user.id
          render status: :ok, json: { user_name: user.name }
        else
          render status: :unauthorized
        end
      end

      def logged_in
        if current_user.nil?
          render status: :ok, json: { logged_in: false }
        else
          render status: :ok, json: { logged_in: true, user_name: current_user.name }
        end
      end

      def logout
        if session[:user_id]
          session.delete(:user_id)
          render status: :no_content
        else
          render status: :bad_request
        end
      end
    end
  end
end
