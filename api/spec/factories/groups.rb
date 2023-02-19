FactoryBot.define do
  factory :group do
    association :admin, factory: :user

    sequence(:name) { |n| "group_test#{n}" }
    description { "This is a test group" }
  end
end
