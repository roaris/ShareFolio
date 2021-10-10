module Api
  module V1
    class UsersController < ApplicationController
      def create
        user = User.new(user_params)

        if user.save
          session[:user_id] = user.id
          render json: user, status: 201
        else
          render json: user.errors, status: 400
        end
      end

      private
        def user_params
          params.require(:user).permit(
            :name,
            :email,
            :password,
            :password_confirmation
          )
        end
    end
  end
end
