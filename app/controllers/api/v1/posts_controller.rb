# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :require_login

      def index
        posts = Post.all.order(:id)
        render status: :ok, json: posts
      end

      def show
        post = Post.find(params[:id])
        render staus: 200, json: post
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
