# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :require_login, only: :show_me
      skip_before_action :authenticate_user, only: :create

      def create
        FirebaseIdToken::Certificates.request
        raise ArgumentError, 'BadRequest Parameter' if payload.blank?

        uid = payload['sub']

        if user = User.find_by(uid: uid)
          render json: user, status: :ok
        else
          user = User.new(user_params.merge(uid: payload['sub']))
          if user.save
            render json: user, status: :created
          else
            render json: user.errors, status: :bad_request
          end
        end
      end

      def show_me
        render json: current_user, status: :ok
      end

      def update_me
        if current_user.update(user_params)
          render status: :ok, json: current_user
        else
          render status: :bad_request, json: current_user.errors
        end
      end

      def search
        user = User.find_by(uid: params[:uid])
        if user
          render status: :ok, json: user
        else
          render status: :not_found
        end
      end

      private

      def user_params
        params.require(:user).permit(
          :name,
          :email,
          :icon,
        )
      end

      def token_from_request_headers
        request.headers['Authorization']&.split&.last
      end

      def token
        params[:token] || token_from_request_headers
      end

      def payload
        @payload ||= FirebaseIdToken::Signature.verify token
      end
    end
  end
end
