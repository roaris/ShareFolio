# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :ensure_correct_user, only: %i[update, destroy]

      def create
        comment = current_user.comments.build(comment_params.merge({ post_id: params[:post_id] }))
        if comment.save
          CommentMailer.comment_notification(comment).deliver_now if current_user.id != comment.post.user.id
          render status: :created, json: comment
        else
          render status: :bad_request, json: comment.errors
        end
      end

      def update
        comment = Comment.find(params[:id])
        if comment.update(comment_params)
          render status: :ok, json: comment
        else
          render status: :bad_request, json: comment.errors
        end
      end

      def destroy
        comment = Comment.find(params[:id])
        comment.destroy
        render status: :no_content
      end

      private

      def comment_params
        params.require(:comment).permit(:content)
      end

      def ensure_correct_user
        render status: :forbidden unless current_user.comments.find_by(id: params[:id])
      end
    end
  end
end
