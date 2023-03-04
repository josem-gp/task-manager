class Task < ApplicationRecord
  # Using filterable gem (https://github.com/toschas/filterable)
  filter_by :assignee_id, :finished
  # We want the filter by name to be broader (instead of a specific name, we search by regex) so we customize it
  filter_by :fuzzy_name, custom: true

  scope :by_fuzzy_name, ->(name) { where('name LIKE ?', "%#{name}%") }
  # We want the filter by due_date to include the date we use to filter using "from"
  filter_by :due_date, custom: true, prefix: [:from, :to]

  scope :from_due_date, ->(from_date) { where('due_date >= ?', Date.parse(from_date)) }
  scope :to_due_date, ->(to_date) { where('due_date <= ?', Date.parse(to_date)) }

  # Associations
  belongs_to :group
  belongs_to :user
  belongs_to :assignee, class_name: "User", foreign_key: :assignee_id
  has_many :tagged_tasks, dependent: :destroy

  # Validations
  validates :name, presence: true, length: { maximum: 25 }, uniqueness: { case_sensitive: false, scope: :group_id }
  validates :due_date, date: true 
  
  # validate :valid_task?

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
