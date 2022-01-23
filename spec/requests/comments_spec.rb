# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/posts/:post_id/comments', type: :request do
  let(:new_post) { create(:post) }
  let(:comment) { create(:comment) }
  let(:user) { create(:user) }

  describe 'create' do
    it 'accept an auth user' do
      login_as(user)
      post "/api/v1/posts/#{new_post.id}/comments", params: default_comment_params.to_json,
                                                    headers: xhr_header.merge(json_header)
      expect(response.status).to eq(201)
      expect(json(response)).to include(default_comment_params[:comment].with_indifferent_access)
    end

    it 'reject an unauth user' do
      post "/api/v1/posts/#{new_post.id}/comments", params: default_comment_params.to_json,
                                                    headers: xhr_header.merge(json_header)
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      login_as(user)
      post "/api/v1/posts/#{new_post.id}/comments", params: default_comment_params.to_json, headers: json_header
      expect(response.status).to eq(403)
    end
  end

  describe 'update' do
    it 'accept an owner and a valid update' do
      login_as(comment.user)
      patch "/api/v1/posts/#{comment.post.id}/comments/#{comment.id}", params: default_comment_params.to_json,
                                                                       headers: xhr_header.merge(json_header)
      expect(response.status).to eq(200)
      expect(json(response)).to include(default_comment_params[:comment].with_indifferent_access)
    end

    it 'reject an invalid update' do
      login_as(comment.user)
      invalid_comment_params = default_comment_params
      invalid_comment_params[:comment][:content] = ''
      patch "/api/v1/posts/#{comment.post.id}/comments/#{comment.id}", params: invalid_comment_params.to_json,
                                                                       headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject a not owner' do
      login_as(user)
      patch "/api/v1/posts/#{comment.post.id}/comments/#{comment.id}", params: default_comment_params.to_json,
                                                                       headers: xhr_header.merge(json_header)
      expect(response.status).to eq(403)
    end

    it 'protect from CSRF' do
      login_as(comment.user)
      patch "/api/v1/posts/#{comment.post.id}/comments/#{comment.id}", params: default_comment_params.to_json,
                                                                       headers: json_header
      expect(response.status).to eq(403)
    end
  end

  describe 'destroy' do
    it 'accept an owner' do
      login_as(comment.user)
      delete "/api/v1/posts/#{comment.post.id}/comments/#{comment.id}", headers: xhr_header
      expect(response.status).to eq(204)
    end

    it 'reject a not owner' do
      login_as(user)
      delete "/api/v1/posts/#{comment.post.id}/comments/#{comment.id}", headers: xhr_header
      expect(response.status).to eq(403)
    end

    it 'protect from CSRF' do
      login_as(comment.user)
      delete "/api/v1/posts/#{comment.post.id}/comments/#{comment.id}"
      expect(response.status).to eq(403)
    end
  end
end
