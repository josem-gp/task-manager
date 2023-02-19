FactoryBot.define do
  factory :task do
    association :user
    association :group
    association :assignee, factory: :user

    name { "Factory task" }
    due_date { "24/07/2050" }
  end
end
