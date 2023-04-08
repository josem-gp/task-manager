class Task < ApplicationRecord
  enum status: { false: "0", true: "1" }

  # Using filterable gem (https://github.com/toschas/filterable)
  filter_by :assignee_id
  # We want the filter by name to be broader (instead of a specific name, we search by regex) so we customize it
  filter_by :fuzzy_name, custom: true

  scope :by_fuzzy_name, ->(name) { where('name LIKE ?', "%#{name}%") }
  # We want the filter by due_date to include the date we use to filter using "from"
  filter_by :due_date, custom: true, prefix: [:from, :to]

  filter_by :finished, custom: true
  scope :by_status, ->(status) {where(finished: status)}

  scope :from_due_date, ->(from_date) { where('due_date >= ?', Date.parse(from_date)) }
  scope :to_due_date, ->(to_date) { where('due_date <= ?', Date.parse(to_date)) }

  # Associations
  belongs_to :group
  belongs_to :user
  belongs_to :assignee, class_name: "User", foreign_key: :assignee_id, optional: true
  has_many :tagged_tasks, dependent: :destroy
  has_many :tags, through: :tagged_tasks

  # Validations
  validates :name, presence: true, length: { maximum: 25 }, uniqueness: { case_sensitive: false, scope: :group_id }
  validates :due_date, presence: true, date: true 

  # Find all tasks where user is the creator or assignee for a group
  def self.find_user_group_tasks(group, user)
    return self.where(group: group).and(self.where(user: user).or(self.where(assignee: user)))
  end

  # Create tagged_tasks for a task that has received one or more tags on create/edit
  def create_tagged_tasks(tag_ids)
    # We first need to reset the tagged_tasks for the task. Then create from scratch 
    # (in case the user is removing tags on Task edit) 
    # -> we could loop and see the difference between the tags now and before but just deleting everything is less consuming
    TaggedTask.where(task: self).destroy_all

    # We loop around the tag_ids and checked if they exist in the db. If they don't we move to the next id.
    # If we do, we create the TaggedTask instance
    tag_ids.each do |id|
      begin
        t = Tag.find(id)
        begin
          TaggedTask.create!(tag: t, task: self)
          next # Used to jump to the next element in the loop
        rescue ActiveRecord::RecordInvalid
          next
        end
      rescue ActiveRecord::RecordNotFound
        next
      else
        TaggedTask.create!(tag: t, task: self)
      end
    end
  end
end
