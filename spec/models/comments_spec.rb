# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:comment) { create(:comment) }

  it 'is valid' do
    expect(comment).to be_valid
  end

  it 'is invalid with an empty content' do
    comment.content = ''
    expect(comment).to be_invalid
  end

  it 'is deleted when a corresponding user is deleted' do
    user = comment.user
    expect do
      user.destroy
    end.to change(described_class, :count).by(-1)
  end

  it 'is deleted when a corresponding post is deleted' do
    post = comment.post
    expect do
      post.destroy
    end.to change(described_class, :count).by(-1)
  end
end
