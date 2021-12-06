# frozen_string_literal: true

module Api
  module V1
    class LikesController < ApplicationController
      def create
        post_id = params[:post_id]
        like = current_user.likes.build(post_id: post_id)
        if like.save
          post = Post.find(post_id)
          post.update(like_num: post.like_num + 1)
          render status: :created, json: like
        else
          render status: :bad_request
        end
      end

      def destroy
        post_id = params[:post_id]
        like = Like.find_by(user_id: current_user.id, post_id: post_id)
        if like
          like.destroy
          post = Post.find(post_id)
          post.update(like_num: post.like_num - 1)
          render status: :no_content
        else
          render :not_found
        end
      end

      def liked?
        post_id = params[:id]
        like = Like.find_by(user_id: current_user.id, post_id: post_id)
        if like
          render status: :ok, json: { flag: true }
        else
          render status: :ok, json: { flag: false }
        end
      end
    end
  end
end
