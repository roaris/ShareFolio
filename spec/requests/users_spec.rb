# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/users', type: :request do
  let(:user) { create(:user) }

  describe 'show' do
    it 'get an existing user' do
      get "/api/v1/users/#{user.id}", headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response)['name']).to eq(user.name)
      expect(json(response)['email']).to eq(nil)
    end

    it 'return not found' do
      get "/api/v1/users/#{user.id+1}", headers: xhr_header
      expect(response.status).to eq(404)
    end

    it 'protect from CSRF' do
      get "/api/v1/users/#{user.id}"
      expect(response.status).to eq(403)
    end
  end

  describe 'show_me' do
    it 'accept an auth user' do
      login_as(user)
      get '/api/v1/users/me', headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response)['name']).to eq(user.name)
      expect(json(response)['email']).to eq(user.email)
    end

    it 'reject an unauth user' do
      get '/api/v1/users/me', headers: xhr_header
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      login_as(user)
      get "/api/v1/users/me"
      expect(response.status).to eq(403)
    end
  end

  describe 'update_me' do
    it 'accept an auth user and a valid update' do
      login_as(user)
      patch '/api/v1/users/me', params: default_user_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(200)
      expect(json(response)['name']).to eq(user.name)
    end

    it 'reject an invalid update' do
      login_as(user)
      invalid_user_params = default_user_params
      invalid_user_params[:user][:email] = 'test.com'
      patch '/api/v1/users/me', params: invalid_user_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'reject an unauth user' do
      patch '/api/v1/users/me', params: default_user_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      login_as(user)
      patch '/api/v1/users/me', params: default_user_params, headers: json_header
      expect(response.status).to eq(403)
    end
  end

  describe 'posts' do
    before do
      create(:post, user_id: user.id)
      create(:post, user_id: user.id)
    end

    it 'accept an unauth user' do
      get "/api/v1/users/#{user.id}/posts", headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response).length).to eq(2)
    end

    it 'protect from CSRF' do
      get "/api/v1/users/#{user.id}/posts"
      expect(response.status).to eq(403)
    end
  end
end
