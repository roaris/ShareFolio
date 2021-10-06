FactoryBot.define do
  factory :user do
    sequence(:name) {"test"}
    sequence(:email) {"test@example.com"}
    sequence(:password) {"password"}
  end
end
