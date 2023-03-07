class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :group

  # This callback will be triggered after group admin removes user from group
  # It sets task assignee as nil if removed user was the assignee
  # Also, it passes ownership of task to group admin if user was the task creator
  after_destroy :change_task_ownership

  private

  def change_task_ownership
    group = self.group
    user = self.user

    tasks = Task.find_user_group_tasks(group, user)
    tags = Tag.where(group: group).where(user: user)

    tasks.each do |task|
      task.assignee = nil if task.assignee == user
      task.user = group.admin if task.user == user
      task.save!
    end

    tags.each do |tag|
      tag.user = group.admin
      tag.save!
    end
  end
end
