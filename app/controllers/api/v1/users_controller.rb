# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :require_login, only: :show_me

      def create
        user = User.new(user_params)

        if user.save
          session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: user.errors, status: :bad_request
        end
      end

      def show_me
        render json: current_user, status: :ok
      end

      private

      def user_params
        params.require(:user).permit(
          :name,
          :email,
          :password,
          :password_confirmation,
        )
      end
    end
  end
end
