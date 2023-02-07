class Group < ApplicationRecord

  # Associations
  belongs_to :admin, class_name: "User", foreign_key: :admin_id
  has_many :members
  has_many :users, through: :members
  has_many :tasks
  has_many :tags
  has_many :invitations

  # Validations
  validates :name, presence: true, length: { in: 2..15 }
  validates :description, length: { maximum: 30 }


  after_create :create_member

  # Return the total members of a group
  def total_members
    self.members.count
  end

  private
  
  # So that the group's admin becomes also a member of the group
  def create_member
    user = self.admin
    Member.create!(user: user, group: self)
  end
end
