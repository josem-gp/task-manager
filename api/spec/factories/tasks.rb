FactoryBot.define do
  factory :task do
    association :user
    association :group
    association :assignee, factory: :user

    sequence(:name) { |n| "Factory task #{n}" }
    finished { false }
    due_date { Date.current + 10 }
  end
end
