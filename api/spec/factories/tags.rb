FactoryBot.define do
  factory :tag do
    association :user
    association :group

    sequence(:name) { |n| "Factory tag #{n}" }
  end
end
