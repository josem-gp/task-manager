FactoryBot.define do
  factory :tag do
    association :user
    association :group

    name { "Factory tag" }
  end
end
