# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag, type: :model do
  it 'is valid' do
    tag = build(:tag)
    expect(tag).to be_valid
  end

  it 'is invalid with a too long name' do
    tag = build(:tag, name: 'a' * 51)
    expect(tag).to be_invalid
  end
end
