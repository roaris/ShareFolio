require 'rails_helper'

RSpec.describe Post, type: :model do
  before do
    FactoryBot.create(:user)
  end

  it 'is valid' do
    post = FactoryBot.build(:post)
    expect(post).to be_valid
  end

  it 'is invalid with an empty title' do
    post = FactoryBot.build(:post, title: '')
    expect(post).to be_invalid
  end

  it 'is invalid with a too long title' do
    post = FactoryBot.build(:post, title: 'a'*31)
    expect(post).to be_invalid
  end

  it 'is invalid with an empty content' do
    post = FactoryBot.build(:post, content: '')
    expect(post).to be_invalid
  end

  it 'is invalid with a too long content' do
    post = FactoryBot.build(:post, content: 'a'*141)
    expect(post).to be_invalid
  end

  it 'is deleted when an owner is deleted' do
    user = FactoryBot.create(:user)
    post = FactoryBot.create(:post, user_id: user.id)
    expect do
      user.destroy
    end.to change(Post, :count).by(-1)
  end
end
