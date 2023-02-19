FactoryBot.define do
  factory :user do
    association :icon, factory: [:valid_icon]

    trait :valid_username do
      sequence(:username) { |n| "jose_test#{n}" }
    end

    trait :invalid_username do
      username { "a" }
    end

    trait :valid_email do
      sequence(:email) { |n| "factory#{n}@test.io" }
    end

    trait :invalid_email do
      email { "factorytest.io" }
    end

    trait :valid_password do
      password { "123456" }
    end

    trait :invalid_password do
      password { "1234" }
    end

    factory :valid_user, traits: [:valid_username, :valid_email, :valid_password]
    factory :user_without_username, traits: [:valid_email, :valid_password]
    factory :user_without_email, traits: [:valid_username, :valid_password]
    factory :user_without_password, traits: [:valid_username, :valid_email]
    factory :user_with_invalid_username, traits: [:invalid_username, :valid_email, :valid_password]
    factory :user_with_invalid_password, traits: [:valid_username, :valid_email, :invalid_password]
    factory :user_with_invalid_email, traits: [:valid_username, :invalid_email, :valid_password]
  end
end
