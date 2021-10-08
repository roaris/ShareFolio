FactoryBot.define do
  factory :post do
    sequence(:title) { |n| "title#{n}"}
    sequence(:content) { |n| "content#{n}"}
  end
end
