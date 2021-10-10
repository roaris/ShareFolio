# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/users', type: :request do
  describe 'create' do
    it 'accept valid user params' do
      expect do
        post '/api/v1/users', params: default_user_params.to_json, headers: xhr_header.merge(json_header)
      end.to change(User, :count).by(1)
      expect(response.status).to eq(201)
    end

    it 'reject user params with an empty name' do
      invalid_user_params = default_user_params
      invalid_user_params[:user][:name] = ''
      post '/api/v1/users', params: invalid_user_params.to_json, headers: xhr_header.merge(json_header)
      expect(response.status).to eq(400)
    end

    it 'protect from CSRF' do
      post '/api/v1/users', params: default_user_params.to_json, headers: json_header
      expect(response.status).to eq(403)
    end
  end
end
