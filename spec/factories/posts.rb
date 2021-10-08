FactoryBot.define do
  factory :post do
    sequence(:title) { |n| "title#{n}"}
    sequence(:content) { |n| "content#{n}"}
    sequence(:user_id) {1}
  end
end
