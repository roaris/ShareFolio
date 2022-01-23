# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate_user, only: %i[show create posts]

      def show
        user = User.find_by(id: params[:id])
        if user
          render json: user.secret_mask, status: :ok
        else
          render status: :not_found
        end
      end

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
        render json: current_user.process, status: :ok
      end

      def update_me
        if current_user.update(user_params)
          render status: :ok, json: current_user.process
        else
          render status: :bad_request, json: current_user.errors
        end
      end

      def posts
        user = User.find(params[:id])
        if user
          posts = user.posts.preload(:tags)
          if request.headers['Authorization']
            render status: :ok, json: posts.map { |post|
              post.as_json.merge({ like_flag: Like.exists?(post_id: post.id, user_id: current_user.id), tags: post.tags })
            }
          else
            render status: :ok, json: posts.map { |post| post.as_json.merge({ tags: post.tags }) }
          end
        else
          render status: :not_found
        end
      end

      private

      def user_params
        params.require(:user).permit(
          :name,
          :email,
          :upload_icon,
          :default_icon_url,
          :twitter,
          :github,
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
