FactoryBot.define do
  factory :group do
    association :admin, factory: [:valid_user]

    trait :valid_name do
      sequence(:name) { |n| "group_test#{n}" }
    end

    trait :invalid_name do
      name { "a" }
    end

    trait :valid_description do
      description { "This is a test group" }
    end

    trait :invalid_description do
      description { "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    end

    factory :valid_group, traits: [:valid_name, :valid_description]
    factory :group_without_name, traits: [:valid_description]
    factory :group_with_invalid_name, traits: [:invalid_name, :valid_description]
    factory :group_with_invalid_description, traits: [:valid_name, :invalid_description]
  end
end
