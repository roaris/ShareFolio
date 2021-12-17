# frozen_string_literal: true

FactoryBot.define do
  factory :tagging do
    association :post
    association :tag
  end
end
