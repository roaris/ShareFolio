# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :require_login

      def create
        comment = current_user.comments.build(comment_params.merge({ post_id: params[:post_id] }))
        if comment.save
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
