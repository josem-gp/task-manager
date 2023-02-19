class Tag < ApplicationRecord

  # Associations
  belongs_to :group
  belongs_to :user
  has_many :tagged_tasks

  # Validations
  validates :name, presence: true, length: { maximum: 15 }

  # validate :tag_validation

  # Callbacks
  # It has to be before_save, and without saying self.save if not it will enter in an infinite loop
  before_save :create_slug_from_name

  private

  # Validate tag before creation
  def tag_validation
    tag_user = self.user
    tag_group = self.group

    errors.add(:user, "doesn't belong to this tag's group.") unless tag_user.groups.exists?(id: tag_group.id)
  end

  def create_slug_from_name
    slug = self.name.downcase.split(" ").join("_")
    self.slug = slug
  end
end
