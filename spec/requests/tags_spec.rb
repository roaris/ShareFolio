# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/tags', type: :request do
  describe 'index' do
    it 'accept an unauth user' do
      create_list(:tag, 10)
      get '/api/v1/tags', headers: xhr_header
      expect(response.status).to eq(200)
      expect(json(response).length).to eq(10)
    end

    it 'protect from CSRF' do
      get '/api/v1/tags'
      expect(response.status).to eq(403)
    end
  end
end
