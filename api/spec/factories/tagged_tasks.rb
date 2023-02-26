FactoryBot.define do
  factory :tagged_task do
    association :tag
    association :task
  end
end