# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is invalid with an empty name' do
    user = build(:user, name: '')
    expect(user).to be_invalid
  end

  it 'is invalid with a too short name' do
    user = build(:user, name: 'aa')
    expect(user).to be_invalid
  end

  it 'is invalid with a too long name' do
    user = build(:user, name: 'a' * 21)
    expect(user).to be_invalid
  end

  it 'is invalid with an empty email address' do
    user = build(:user, email: '')
    expect(user).to be_invalid
  end

  it 'is valid with a valid email address' do
    valid_addresses = %w[test@example.com test_hoge@example.com TEST@example.com test@foo.bar.org first.last@foo.jp]
    valid_addresses.each do |address|
      user = build(:user, email: address)
      expect(user).to be_valid
    end
  end

  it 'is invalid with a invalid email address' do
    invalid_addresses = %w[test@example..com test.example.com test@foo@bar.com test@foo_bar.com]
    invalid_addresses.each do |address|
      user = build(:user, email: address)
      expect(user).to be_invalid
    end
  end
end
