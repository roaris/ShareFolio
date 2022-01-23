# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/posts/:post_id/likes', type: :request do
  let(:user) { create(:user) }
  let(:new_post) { create(:post) }

  describe 'create' do
    it 'accept an auth user' do
      login_as(user)
      expect do
        post "/api/v1/posts/#{new_post.id}/likes", headers: xhr_header
      end.to change(Like, :count).by(1)
      expect(response.status).to eq(201)
    end

    it 'reject an unauth user' do
      post "/api/v1/posts/#{new_post.id}/likes", headers: xhr_header
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      login_as(user)
      post "/api/v1/posts/#{new_post.id}/likes"
      expect(response.status).to eq(403)
    end
  end

  describe 'destroy' do
    it 'accept an auth user' do
      login_as(user)
      post "/api/v1/posts/#{new_post.id}/likes", headers: xhr_header
      delete "/api/v1/posts/#{new_post.id}/likes", headers: xhr_header
      expect(response.status).to eq(204)
    end

    it 'reject an unauth user' do
      delete "/api/v1/posts/#{new_post.id}", headers: xhr_header
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      login_as(user)
      delete "/api/v1/posts/#{new_post.id}/likes"
      expect(response.status).to eq(403)
    end
  end
end
