FactoryBot.define do
  factory :user do
    association :icon

    sequence(:username) { |n| "jose_test#{n}" }
    sequence(:email) { |n| "factory#{n}@test.io" }
    password { "123456" }
  end
end
