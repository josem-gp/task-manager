class Group < ApplicationRecord

  # Associations
  belongs_to :admin, class_name: "User", foreign_key: :admin_id
  has_many :memberships
  has_many :users, through: :memberships
  has_many :tasks
  has_many :tags
  has_many :invitations

  # Validations
  validates :name, presence: true, length: { in: 2..15 }
  validates :description, length: { maximum: 30 }


  after_create :create_membership

  # Return the total members of a group
  def total_memberships
    self.memberships.count
  end

  private
  
  # So that the group's admin becomes also a member of the group
  def create_membership
    user = self.admin
    Membership.create!(user: user, group: self)
  end
end
