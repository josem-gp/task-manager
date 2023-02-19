FactoryBot.define do
  factory :invitation do
    association :sender, factory: :user
    association :group

    sequence(:email) { |n| "factory#{n}@test.io" }
  end
end
