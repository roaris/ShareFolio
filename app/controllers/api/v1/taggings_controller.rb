# frozen_string_literal: true

module Api
  module V1
    class TaggingsController < ApplicationController
      before_action :ensure_correct_user

      def update
        post_id = params[:post_id]
        Tagging.where(post_id: post_id).delete_all
        Tagging.insert_all(params[:tag_ids].map do |tag_id|
          { post_id: post_id, tag_id: tag_id, created_at: Time.zone.now, updated_at: Time.zone.now }
        end)
        render status: :ok
      end

      private

      def ensure_correct_user
        render status: :forbidden unless current_user.posts.find_by(id: params[:post_id])
      end
    end
  end
end
