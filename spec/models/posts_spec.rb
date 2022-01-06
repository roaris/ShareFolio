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

  it 'is valid with a valid app url' do
    valid_urls = %w[http://example.com https://example.com https://sub.example.com]
    valid_urls.each do |valid_url|
      post = build(:post, app_url: valid_url)
      expect(post).to be_valid
    end
  end

  it 'is invalid with an invalid app url' do
    invalid_urls = %w[http:/ http:// http://example http://example. http://.com ahttp://example.com]
    invalid_urls.each do |invalid_url|
      post = build(:post, app_url: invalid_url)
      expect(post).to be_invalid
    end
  end

  it 'is valid with no repo_url' do
    post = build(:post, repo_url: nil)
    expect(post).to be_valid
  end

  it 'is invalid with a too long repo_url' do
    post = build(:post, repo_url: 'a' * 256)
    expect(post).to be_invalid
  end

  it 'is valid with a valid repo url' do
    valid_urls = %w[http://example.com https://example.com https://sub.example.com]
    valid_urls.each do |valid_url|
      post = build(:post, repo_url: valid_url)
      expect(post).to be_valid
    end
  end

  it 'is invalid with an invalid repo url' do
    invalid_urls = %w[http:/ http:// http://example http://example. http://.com ahttp://example.com]
    invalid_urls.each do |invalid_url|
      post = build(:post, repo_url: invalid_url)
      expect(post).to be_invalid
    end
  end

  it 'is invalid with an empty description' do
    post = build(:post, description: '')
    expect(post).to be_invalid
  end

  it 'is invalid with a float like_num' do
    post = build(:post, like_num: 1.23)
    expect(post).to be_invalid
  end

  it 'is invalid with a minus like_num' do
    post = build(:post, like_num: -1)
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

  it 'has approriate tags' do
    tagging1 = create(:tagging)
    post = tagging1.post
    tagging2 = create(:tagging, post_id: post.id)
    expect(post.tags).to eq([tagging1.tag, tagging2.tag])
  end
end
