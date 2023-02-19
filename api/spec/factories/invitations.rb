FactoryBot.define do
  factory :invitation do
    association :sender, factory: [:valid_user]
    association :group, factory: [:valid_group]

    trait :valid_email do
      sequence(:email) { |n| "factory#{n}@test.io" }
    end

    trait :invalid_email do
      email { "factorytest.io" }
    end

    factory :valid_invitation, traits: [:valid_email]
    factory :invitation_without_email, traits: []
    factory :invitation_with_invalid_email, traits: [:invalid_email]
  end
end
