# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/posts', type: :request do
  let!(:user) { create(:user) }

  describe 'index' do
    it 'accept an auth user' do
      create_list(:post, 10)
      get '/api/v1/posts?page=1&per=6', headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response)['posts_and_users'].length).to eq(6)
      get '/api/v1/posts?page=2&per=6', headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response)['posts_and_users'].length).to eq(4)
    end

    it 'accept an unauth user' do
      get '/api/v1/posts', headers: xhr_header
      expect(response.status).to eq(200)
    end

    it 'protect from CSRF' do
      get '/api/v1/posts'
      expect(response.status).to eq(403)
    end
  end

  describe 'show' do
    let!(:post) { create(:post) }

    it 'accept an auth user' do
      get "/api/v1/posts/#{post.id}", headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response)['post']['app_name']).to eq(post.app_name)
      expect(json(response)['post']['app_url']).to eq(post.app_url)
      expect(json(response)['post']['repo_url']).to eq(post.repo_url)
      expect(json(response)['post']['description']).to eq(post.description)
      expect(json(response)['user']['name']).to eq(user.name)
    end

    it 'accept an unauth user' do
      get "/api/v1/posts/#{post.id}", headers: xhr_header
      expect(response.status).to eq(200)
    end

    it 'protect from CSRF' do
      get "/api/v1/posts/#{post.id}"
      expect(response.status).to eq(403)
    end
  end
end
