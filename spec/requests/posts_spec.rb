# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/posts', type: :request do
  describe 'index' do
    it 'accept an unauth user' do
      create_list(:post, 10)
      get '/api/v1/posts?page=1&per=6', headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response)['posts_and_users'].length).to eq(6)
      get '/api/v1/posts?page=2&per=6', headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response)['posts_and_users'].length).to eq(4)
    end

    it 'protect from CSRF' do
      get '/api/v1/posts'
      expect(response.status).to eq(403)
    end
  end

  describe 'recent' do
    it 'accpet an unauth user' do
      create_list(:post, 10)
      get '/api/v1/posts/recent?limit=4', headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response).length).to eq(4)
      get '/api/v1/posts/recent?limit=10', headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response).length).to eq(10)
    end

    it 'protect from CSRF' do
      get '/api/v1/posts/recent?limit=4'
      expect(response.status).to eq(403)
    end
  end

  describe 'show' do
    let!(:post) { create(:post) }

    it 'accept an unauth user' do
      get "/api/v1/posts/#{post.id}", headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response)['post']['app_name']).to eq(post.app_name)
      expect(json(response)['post']['app_url']).to eq(post.app_url)
      expect(json(response)['post']['repo_url']).to eq(post.repo_url)
      expect(json(response)['post']['description']).to eq(post.description)
      expect(json(response)['user']['name']).to eq(post.user.name)
    end

    it 'protect from CSRF' do
      get "/api/v1/posts/#{post.id}"
      expect(response.status).to eq(403)
    end
  end

  describe 'create' do
    let(:user) { create(:user) }

    it 'accept an auth user and a valid post' do
      login_as(user)
      post '/api/v1/posts', params: default_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(201)
      expect(json(response)).to include(default_post_params[:post].with_indifferent_access)
    end

    it 'reject an invalid post' do
      login_as(user)
      invalid_post_params = default_post_params
      invalid_post_params[:post][:app_name] = ''
      post '/api/v1/posts', params: invalid_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject an unauth user' do
      post '/api/v1/posts', params: default_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      login_as(user)
      post '/api/v1/posts', params: default_post_params.to_json, headers: json_header
      expect(response.status).to eq(403)
    end
  end

  describe 'update' do
    let(:post) { create(:post) }
    let(:user) { create(:user) }

    it 'accept an owner and a valid update' do
      login_as(post.user)
      patch "/api/v1/posts/#{post.id}", params: default_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(200)
      expect(json(response)).to include(default_post_params[:post].with_indifferent_access)
    end

    it 'reject an invalid update' do
      login_as(post.user)
      invalid_post_params = default_post_params
      invalid_post_params[:post][:app_name] = ''
      patch "/api/v1/posts/#{post.id}", params: invalid_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject a not owner' do
      login_as(user)
      patch "/api/v1/posts/#{post.id}", params: default_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(403)
    end

    it 'protect from CSRF' do
      login_as(post.user)
      patch "/api/v1/posts/#{post.id}", params: default_post_params.to_json, headers: json_header
      expect(response.status).to eq(403)
    end
  end

  describe 'delete' do
    let(:post) { create(:post) }
    let(:user) { create(:user) }

    it 'accept an owner' do
      login_as(post.user)
      delete "/api/v1/posts/#{post.id}", headers: xhr_header
      expect(response.status).to eq(204)
    end

    it 'reject a not owner' do
      login_as(user)
      delete "/api/v1/posts/#{post.id}", headers: xhr_header
      expect(response.status).to eq(403)
    end

    it 'protect from CSRF' do
      login_as(post.user)
      delete "/api/v1/posts/#{post.id}"
      expect(response.status).to eq(403)
    end
  end
end
