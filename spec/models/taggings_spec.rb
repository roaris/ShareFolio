# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tagging, type: :model do
  let(:tagging) { create(:tagging) }

  it 'is valid' do
    expect(tagging).to be_valid
  end

  it 'is deleted when a corresponding post is deleted' do
    post = tagging.post
    expect do
      post.destroy
    end.to change(described_class, :count).by(-1)
  end

  it 'is deleted when a corresponding tag is deleted' do
    tag = tagging.tag
    expect do
      tag.destroy
    end.to change(described_class, :count).by(-1)
  end

  it 'is invalid when a same tagging exists' do
    invalid_tagging = build(:tagging, post_id: tagging.post.id, tag_id: tagging.tag.id)
    expect(invalid_tagging).to be_invalid
  end
end
