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
      expect(json(response)['title']).to eq(post.title)
      expect(json(response)['content']).to eq(post.content)
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
      post_params = { title: 'test_title', content: 'test_content' }
      expect do
        post '/api/v1/posts', params: post_params.to_json, headers: xhr_header.merge(json_header)
      end.to change(Post, :count).by(1)
      expect(response.status).to eq(201)
      expect(json(response)['title']).to eq('test_title')
      expect(json(response)['content']).to eq('test_content')
    end

    it 'reject a post with an empty title' do
      log_in_as(user)
      post_params = { title: '', content: 'test_content' }
      post '/api/v1/posts', params: post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject a post with an empty content' do
      log_in_as(user)
      post_params = { title: 'test_content', content: '' }
      post '/api/v1/posts', params: post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject an unauth user' do
      post_params = { title: 'test_title', content: 'test_content' }
      post '/api/v1/posts', params: post_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      log_in_as(user)
      post_params = { title: 'test_title', content: 'test_content' }
      post '/api/v1/posts', params: post_params.to_json, headers: json_header
      expect(response.status).to eq(403)
    end
  end

  describe 'update' do
    let!(:post) { create(:post) }

    it 'accept a valid update' do
      log_in_as(user)
      update_params = { title: 'test_title', content: 'test_content' }
      patch "/api/v1/posts/#{post.id}", params: update_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(200)
      expect(json(response)['title']).to eq('test_title')
      expect(json(response)['content']).to eq('test_content')
    end

    it 'reject an update with an empty title' do
      log_in_as(user)
      update_params = { title: '', content: 'test_content' }
      patch "/api/v1/posts/#{post.id}", params: update_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject an update with an empty content' do
      log_in_as(user)
      update_params = { title: 'test_title', content: '' }
      patch "/api/v1/posts/#{post.id}", params: update_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject an unauth user' do
      update_params = { title: 'test_title', content: 'test_content' }
      patch "/api/v1/posts/#{post.id}", params: update_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      log_in_as(user)
      update_params = { title: 'test_title', content: 'test_content' }
      patch "/api/v1/posts/#{post.id}", params: update_params.to_json, headers: json_header
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
