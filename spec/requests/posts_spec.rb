# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/posts', type: :request do
  let!(:user) { create(:user) }

  describe 'index' do
    it 'accept an auth user' do
      create_list(:post, 10)
      log_in_as(user)
      get '/api/v1/posts', headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response).length).to eq(10)
    end

    it 'reject an unauth user' do
      get '/api/v1/posts', headers: xhr_header
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      log_in_as(user)
      get '/api/v1/posts'
      expect(response.status).to eq(403)
    end
  end

  describe 'show' do
    let!(:post) { create(:post) }

    it 'accept an auth user' do
      log_in_as(user)
      get "/api/v1/posts/#{post.id}", headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response)['post']['app_name']).to eq(post.app_name)
      expect(json(response)['post']['app_url']).to eq(post.app_url)
      expect(json(response)['post']['repo_url']).to eq(post.repo_url)
      expect(json(response)['post']['description']).to eq(post.description)
      expect(json(response)['user']['name']).to eq(user.name)
    end

    it 'reject an unauth user' do
      get "/api/v1/posts/#{post.id}", headers: xhr_header
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      log_in_as(user)
      get "/api/v1/posts/#{post.id}"
      expect(response.status).to eq(403)
    end
  end

  describe 'create' do
    it 'accept a valid post' do
      log_in_as(user)
      expect do
        post '/api/v1/posts', params: default_post_params.to_json, headers: xhr_header.merge(json_header)
      end.to change(Post, :count).by(1)
      expect(response.status).to eq(201)
      expect(json(response)['app_name']).to eq('test_app')
      expect(json(response)['app_url']).to eq('test_app_url')
      expect(json(response)['repo_url']).to eq('test_repo_url')
      expect(json(response)['description']).to eq('test_description')
    end

    it 'reject a post with an empty app_name' do
      log_in_as(user)
      invalid_post_params = default_post_params
      invalid_post_params[:post][:app_name] = ''
      post '/api/v1/posts', params: invalid_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject a post with an empty app_url' do
      log_in_as(user)
      invalid_post_params = default_post_params
      invalid_post_params[:post][:app_url] = ''
      post '/api/v1/posts', params: invalid_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'accept a post with no repo_url' do
      log_in_as(user)
      invalid_post_params = default_post_params
      invalid_post_params[:post][:repo_url] = nil
      post '/api/v1/posts', params: invalid_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(201)
    end

    it 'reject a post with an empty description' do
      log_in_as(user)
      invalid_post_params = default_post_params
      invalid_post_params[:post][:description] = ''
      post '/api/v1/posts', params: invalid_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject an unauth user' do
      post '/api/v1/posts', params: default_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      log_in_as(user)
      post '/api/v1/posts', params: default_post_params.to_json, headers: json_header
      expect(response.status).to eq(403)
    end
  end

  describe 'update' do
    let!(:post) { create(:post) }

    it 'accept a valid update' do
      log_in_as(user)
      patch "/api/v1/posts/#{post.id}", params: default_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(200)
      expect(json(response)['app_name']).to eq('test_app')
      expect(json(response)['app_url']).to eq('test_app_url')
      expect(json(response)['repo_url']).to eq('test_repo_url')
      expect(json(response)['description']).to eq('test_description')
    end

    it 'reject an update with an empty app_name' do
      log_in_as(user)
      invalid_update_params = default_post_params
      invalid_update_params[:post][:app_name] = ''
      patch "/api/v1/posts/#{post.id}", params: invalid_update_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject an update with an empty app_url' do
      log_in_as(user)
      invalid_update_params = default_post_params
      invalid_update_params[:post][:app_url] = ''
      patch "/api/v1/posts/#{post.id}", params: invalid_update_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'accept an update with no repo_url' do
      log_in_as(user)
      invalid_update_params = default_post_params
      invalid_update_params[:post][:repo_url] = nil
      patch "/api/v1/posts/#{post.id}", params: invalid_update_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(200)
    end

    it 'reject an update with an empty description' do
      log_in_as(user)
      invalid_update_params = default_post_params
      invalid_update_params[:post][:description] = ''
      patch "/api/v1/posts/#{post.id}", params: invalid_update_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject an unauth user' do
      patch "/api/v1/posts/#{post.id}", params: default_post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      log_in_as(user)
      patch "/api/v1/posts/#{post.id}", params: default_post_params.to_json, headers: json_header
      expect(response.status).to eq(403)
    end
  end

  describe 'delete' do
    let!(:post) { create(:post) }

    it 'accept an auth user' do
      log_in_as(user)
      expect do
        delete "/api/v1/posts/#{post.id}", headers: xhr_header
      end.to change(Post, :count).by(-1)
      expect(response.status).to eq(204)
    end

    it 'reject an unauth user' do
      delete "/api/v1/posts/#{post.id}", headers: xhr_header
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      log_in_as(user)
      delete "/api/v1/posts/#{post.id}"
      expect(response.status).to eq(403)
    end
  end
end
