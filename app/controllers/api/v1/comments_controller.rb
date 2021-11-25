# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      def create
        comment = current_user.comments.build(comment_params.merge({ post_id: params[:post_id] }))
        if comment.save
          CommentMailer.comment_notification(comment).deliver_now if current_user.id != comment.post.user.id
          render status: :created, json: comment
        else
          render status: :bad_request, json: comment.errors
        end
      end

      private

      def comment_params
        params.require(:comment).permit(:content)
      end
    end
  end
end
