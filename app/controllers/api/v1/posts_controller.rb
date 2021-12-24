# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      skip_before_action :authenticate_user, only: %i[index recent show]
      include Pagination

      def index
        posts = if tag_id = params[:tag_id]
                  Tag.find(tag_id).posts.order(id: 'DESC')
                else
                  Post.all.order(id: 'DESC')
                end

        posts = posts.page(params[:page]).per(params[:per])
        posts = posts.eager_load(:user).preload(:tags)
        pagination = pagination(posts)
        posts_and_users = []

        if request.headers['Authorization']
          authenticate_user
          posts.each do |post|
            like_flag = Like.exists?(post_id: post.id, user_id: current_user.id)
            posts_and_users.push({ post: post.as_json.merge({ like_flag: like_flag, tags: post.tags }),
                                   user: post.user.secret_mask })
          end
        else
          posts.each do |post|
            posts_and_users.push({ post: post.as_json.merge({ tags: post.tags }), user: post.user.secret_mask })
          end
        end

        render status: :ok, json: { posts_and_users: posts_and_users }.merge(pagination)
      end

      def recent
        posts = Post.all.eager_load(:user).preload(:tags).order(id: 'DESC').limit(params[:limit])
        posts_and_users = []
        posts.each do |post|
          posts_and_users.push({ post: post.as_json.merge({ tags: post.tags }), user: post.user.secret_mask })
        end
        render status: :ok, json: posts_and_users
      end

      def show
        post = Post.find(params[:id])
        comments_and_users = []
        post.comments.eager_load(:user).each do |comment|
          comments_and_users.push({ comment: comment, user: comment.user.secret_mask })
        end

        if request.headers['Authorization']
          authenticate_user
          like_flag = Like.exists?(post_id: post.id, user_id: current_user.id)
          render staus: :ok,
                 json: { post: post.as_json.merge({ like_flag: like_flag, tags: post.tags }), user: post.user.secret_mask,
                         comments_and_users: comments_and_users }
        else
          render staus: :ok,
                 json: { post: post.as_json.merge({ tags: post.tags }), user: post.user.secret_mask,
                         comments_and_users: comments_and_users }
        end
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
