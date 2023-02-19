FactoryBot.define do
  factory :task do
    association :user, factory: [:valid_user]
    association :group, factory: [:valid_group]
    association :assignee, factory: [:valid_user]

    due_date { "24/07/2050" }

    trait :valid_name do
      name { "Factory task" }
    end

    trait :invalid_name do
      name { "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet" }
    end

    factory :valid_task, traits: [:valid_name]
    factory :task_without_name, traits: []
    factory :task_with_invalid_name, traits: [:invalid_name]
  end
end
