FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "test"}
    sequence(:email) { |n| "test@example.com"}
    sequence(:password) { |n| "password"}
  end
end
