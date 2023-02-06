class Tag < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :tagged_tasks

  validate :save_tag?

  private

  # Validate tag before creation
  def save_tag?
    tag_user = self.user
    tag_group = self.group

    errors.add(:user, "doesn't belong to this tag's group.") unless tag_user.groups.exists?(id: tag_group.id)
  end
end
