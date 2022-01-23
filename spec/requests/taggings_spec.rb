# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v1/posts/post_id/taggings', type: :request do
  let(:tags) { create_list(:tag, 5) }
  let(:post) { create(:post) }
  let(:user) { create(:user) }

  describe 'update' do
    it 'accept an owner' do
      login_as(post.user)
      expect do
        patch "/api/v1/posts/#{post.id}/taggings", params: { tag_ids: [tags[0].id, tags[2].id, tags[4].id] }.to_json,
                                                   headers: xhr_header.merge(json_header)
      end.to change(Tagging, :count).by(3)
      expect(response.status).to eq(200)
    end

    it 'reject a not owner' do
      login_as(user)
      patch "/api/v1/posts/#{post.id}/taggings", params: { tag_ids: [tags[0].id, tags[2].id, tags[4].id] }.to_json,
                                                 headers: xhr_header.merge(json_header)
      expect(response.status).to eq(403)
    end

    it 'protec from CSRF' do
      login_as(post.user)
      patch "/api/v1/posts/#{post.id}/taggings", params: { tag_ids: [tags[0].id, tags[3].id, tags[4].id] }.to_json,
                                                 headers: json_header
      expect(response.status).to eq(403)
    end
  end
end
