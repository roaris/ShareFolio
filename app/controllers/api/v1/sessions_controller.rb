module Api
  module V1
    class SessionsController < ApplicationController
      def create
        user = User.find_by(email: params[:session][:email])

        if user && user.authenticate(params[:session][:password])
          session[:user_id] = user.id
          render status: 204
        else
          render status: 401
        end
      end

      def logged_in?
        render json: { logged_in: !current_user.nil? }
      end
    end
  end
end
