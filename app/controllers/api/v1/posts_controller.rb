module Api
  module V1
    class PostsController < ApplicationController
      before_action :require_login

      def index
        posts = Post.all.order(:id)
        render status: 200, json: posts
      end

      def show
        post = Post.find(params[:id])
        render staus: 200, json: post
      end

      def create
        post = current_user.posts.build(post_params)
        if post.save
          render status: 201, json: post
        else
          render status: 400, json: post.errors
        end
      end

      def update
        post = Post.find(params[:id])
        if post.update(post_params)
          render status: 200, json: post
        else
          render status: 400, json: post.errors
        end
      end

      def destroy
        post = Post.find(params[:id])
        post.destroy
        render status: 204
      end

      private
        def post_params
          params.require(:post).permit(:title, :content)
        end

    end
  end
end
