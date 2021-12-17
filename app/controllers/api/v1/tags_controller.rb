# frozen_string_literal: true

module Api
  module V1
    class TagsController < ApplicationController
      def index
        render status: :ok, json: Tag.all
      end
    end
  end
end
