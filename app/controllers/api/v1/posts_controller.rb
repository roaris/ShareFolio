# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      skip_before_action :authenticate_user, only: %i[index recent show]

      def index
        posts = Post.all.includes(:user).order(:id)
        posts_and_users = []
        posts.each do |post|
          posts_and_users.push({ post: post, user: post.user })
        end
        render status: :ok, json: posts_and_users
      end

      def recent
        posts = Post.all.includes(:user).order(id: 'DESC').limit(4)
        posts_and_users = []
        posts.each do |post|
          posts_and_users.push({ post: post, user: post.user })
        end
        render status: :ok, json: posts_and_users
      end

      def show
        post = Post.find(params[:id])
        comments_and_users = []
        post.comments.includes(:user).each do |comment|
          user = comment.user
          user_icon_url = user.upload_icon.url || user.default_icon_url
          comments_and_users.push({ comment: comment, user_id: user.id, user_name: user.name, user_icon_url: user_icon_url })
        end
        render staus: :ok, json: { post: post, user: post.user, comments_and_users: comments_and_users }
      end

      def create
        post = current_user.posts.build(post_params)
        if post.save
          render status: :created, json: post
        else
          render status: :bad_request, json: post.errors
        end
      end

      def update
        post = Post.find(params[:id])
        if post.update(post_params)
          render status: :ok, json: post
        else
          render status: :bad_request, json: post.errors
        end
      end

      def destroy
        post = Post.find(params[:id])
        post.destroy
        render status: :no_content
      end

      private

      def post_params
        params.require(:post).permit(:app_name, :app_url, :repo_url, :description)
      end
    end
  end
end
