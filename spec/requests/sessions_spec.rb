# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/sessions', type: :request do
  let!(:user) { create(:user) }

  describe 'create' do
    it 'accept a valid user' do
      session_params = { session: { email: user.email, password: user.password } }
      post '/api/v1/sessions', params: session_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(204)
    end

    it 'reject an invalid user' do
      session_params = { session: { email: 'fake@example.com', password: 'fakepass' } }
      post '/api/v1/sessions', params: session_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(401)
    end

    it 'protect from CSRF' do
      session_params = { session: { email: user.email, password: user.password } }
      post '/api/v1/sessions', params: session_params.to_json, headers: json_header
      expect(response.status).to eq(403)
    end
  end

  describe 'logged_in' do
    it 'return true for an auth user' do
      log_in_as(user)
      get '/api/v1/sessions/logged_in', headers: xhr_header
      expect(json(response)['logged_in']).to eq(true)
    end

    it 'return false for an unauth user' do
      get '/api/v1/sessions/logged_in', headers: xhr_header
      expect(json(response)['logged_in']).to eq(false)
    end

    it 'protect from CSRF' do
      get '/api/v1/sessions/logged_in'
      expect(response.status).to eq(403)
    end
  end
end
