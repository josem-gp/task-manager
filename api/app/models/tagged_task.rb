class TaggedTask < ApplicationRecord
  belongs_to :task
  belongs_to :tag

  # validate :valid_tagged_task?

  private

  # Validate TaggedTask before creation
  def valid_tagged_task?
    task = self.task
    tag = self.tag

    errors.add(:group, "doesn't match between tag and task in tagged task.") unless task.group == tag.group
  end
end
