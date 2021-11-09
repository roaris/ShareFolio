# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    sequence(:content) { |n| "content#{n}" }
    sequence(:user_id) { 1 }
    sequence(:post_id) { 1 }
  end
end
