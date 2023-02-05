class Group < ApplicationRecord
  belongs_to :admin, class_name: "User", foreign_key: :admin_id
  has_many :members
  has_many :users, through: :members

  after_create :create_member # The group's admin becomes also a member of the group

  private
  
  def create_member
    user = self.admin
    Member.create!(user: user, group: self)
  end
end
