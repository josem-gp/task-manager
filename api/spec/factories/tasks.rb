FactoryBot.define do
  factory :task do
    association :user
    association :group
    association :assignee, factory: :user

    sequence(:name) { |n| "Factory task #{n}" }
    due_date { "24/07/2050" }
  end
end
