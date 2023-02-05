class Task < ApplicationRecord
  belongs_to :group
  belongs_to :user
  belongs_to :assignee, class_name: "User", foreign_key: :assignee_id
  has_many :tagged_tasks
end
