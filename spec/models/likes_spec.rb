# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Like, type: :model do
  let(:like) { create(:like) }

  it 'is valid' do
    expect(like).to be_valid
  end

  it 'is deleted when a corresponding user is deleted' do
    user = like.user
    expect do
      user.destroy
    end.to change(described_class, :count).by(-1)
  end

  it 'is deleted when a corresponding post is deleted' do
    post = like.post
    expect do
      post.destroy
    end.to change(described_class, :count).by(-1)
  end
end
