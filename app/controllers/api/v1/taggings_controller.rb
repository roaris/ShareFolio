# frozen_string_literal: true

module Api
  module V1
    class TaggingsController < ApplicationController
      def update
        post_id = params[:post_id]
        Tagging.where(post_id: post_id).delete_all
        Tagging.insert_all(params[:tag_ids].map { |tag_id| { post_id: post_id, tag_id: tag_id, created_at: Time.now, updated_at: Time.now } })
        render status: :ok
      end
    end
  end
end
