class Task < ApplicationRecord

  # Associations
  belongs_to :group
  belongs_to :user
  belongs_to :assignee, class_name: "User", foreign_key: :assignee_id
  has_many :tagged_tasks

  # Validations
  validates :name, presence: true, length: { maximum: 15 }
  validates :due_date, date: true 
  validate :valid_task?

  private

  # Validate task before creation
  def valid_task?
    task_user = self.user
    task_group = self.group
    task_assignee = self.assignee

    if !task_user.groups.include?(task_group)
      errors.add(:user, "doesn't belong to this task's group.")
    elsif !task_group.users.include?(task_assignee)
      errors.add(:assignee, "doesn't belong to this task's group.")
    end
  end
end
