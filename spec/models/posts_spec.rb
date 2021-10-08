require 'rails_helper'

RSpec.describe Post, type: :model do
  before do
    create(:user)
  end

  it 'is valid' do
    post = build(:post)
    expect(post).to be_valid
  end

  it 'is invalid with an empty title' do
    post = build(:post, title: '')
    expect(post).to be_invalid
  end

  it 'is invalid with a too long title' do
    post = build(:post, title: 'a'*31)
    expect(post).to be_invalid
  end

  it 'is invalid with an empty content' do
    post = build(:post, content: '')
    expect(post).to be_invalid
  end

  it 'is invalid with a too long content' do
    post = build(:post, content: 'a'*141)
    expect(post).to be_invalid
  end

  it 'is deleted when an owner is deleted' do
    user = create(:user)
    post = create(:post, user_id: user.id)
    expect do
      user.destroy
    end.to change(Post, :count).by(-1)
  end
end
