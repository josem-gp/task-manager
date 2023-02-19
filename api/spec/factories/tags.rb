FactoryBot.define do
  factory :tag do
    association :user, factory: [:valid_user]
    association :group, factory: [:valid_group]

    trait :valid_name do
      name { "Factory tag" }
    end

    trait :invalid_name do
      name { "Lorem ipsum dolor sit amet" }
    end

    factory :valid_tag, traits: [:valid_name]
    factory :tag_without_name, traits: []
    factory :tag_with_invalid_name, traits: [:invalid_name]
  end
end
