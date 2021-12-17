# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    sequence(:content) { |n| "content#{n}" }
    association :user
    association :post
  end
end
