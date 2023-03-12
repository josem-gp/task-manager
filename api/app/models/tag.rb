class Tag < ApplicationRecord

  # Associations
  belongs_to :group
  belongs_to :user
  has_many :tagged_tasks, dependent: :destroy
  has_many :tasks, through: :tagged_tasks

  # Validations
  validates :name, presence: true, length: { maximum: 15 }, uniqueness: { case_sensitive: false, scope: :group_id }

  # Callbacks
  # It has to be before_save, and without saying self.save if not it will enter in an infinite loop
  before_save :create_slug_from_name

  private

  def create_slug_from_name
    slug = self.name.downcase.split(" ").join("_")
    self.slug = slug
  end
end
