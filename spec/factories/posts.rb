# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    sequence(:app_name) { |n| "app#{n}" }
    sequence(:app_url) { |n| "https://example.com/app#{n}" }
    sequence(:repo_url) { |n| "https://example.com/repo#{n}" }
    sequence(:description) { |n| "description#{n}" * 100 }
    sequence(:like_num) { 0 }
    association :user
  end
end
