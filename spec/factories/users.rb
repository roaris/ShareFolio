# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "test#{n}" }
    sequence(:email) { |n| "test#{n}@example.com" }
    sequence(:uid) { |n| "uid#{n}" }
    sequence(:default_icon_url) { 'https://nureyon.com/sample/8/upper_body-2-p2.svg?1601332163' }
  end
end
