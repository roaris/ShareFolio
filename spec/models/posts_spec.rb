# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Post, type: :model do
  before do
    create(:user)
  end

  it 'is valid' do
    post = build(:post)
    expect(post).to be_valid
  end

  it 'is invalid with an empty app_name' do
    post = build(:post, app_name: '')
    expect(post).to be_invalid
  end

  it 'is invalid with a too long app_name' do
    post = build(:post, app_name: 'a' * 51)
    expect(post).to be_invalid
  end

  it 'is invalid with an empty app_url' do
    post = build(:post, app_url: '')
    expect(post).to be_invalid
  end

  it 'is invalid with a too long app_url' do
    post = build(:post, app_url: 'a' * 256)
    expect(post).to be_invalid
  end

  it 'is valid with no repo_url' do
    post = build(:post, repo_url: nil)
    expect(post).to be_valid
  end

  it 'is invalid with a too long repo_url' do
    post = build(:post, repo_url: 'a' * 256)
    expect(post).to be_invalid
  end

  it 'is invalid with an empty description' do
    post = build(:post, description: '')
    expect(post).to be_invalid
  end

  it 'is invalid with a too long description' do
    post = build(:post, description: 'a' * 10001)
    expect(post).to be_invalid
  end

  it 'is deleted when an owner is deleted' do
    user = create(:user)
    create(:post, user_id: user.id)
    expect do
      user.destroy
    end.to change(described_class, :count).by(-1)
  end
end
