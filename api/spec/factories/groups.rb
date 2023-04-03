FactoryBot.define do
  factory :group do
    association :admin, factory: :user

    sequence(:name) { |n| "group_test#{n}" }
    description { "This is a test group" }

    # Callback to create a task, tag, tagged_task and invitations associated to this group
    after(:create) do |group| 
      group_tasks = create_list(:task, 3, group: group, user: group.admin)
      group_tag = create(:tag, group: group, user: group.admin)
      create(:tagged_task, task: group_tasks.first, tag: group_tag)
      create(:invitation, group: group, sender: group.admin)
    end
  end
end
