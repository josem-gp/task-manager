class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  # Associations
  has_many :groups, foreign_key: :admin_id, dependent: :destroy # If we delete the user (if admin), then the group will be also deleted
  has_many :members
  has_many :groups, through: :members
  has_many :tasks
  has_many :tasks, foreign_key: :assignee_id # Tasks will have one assignee per task
  has_many :tags
  has_many :invitations, foreign_key: :sender_id
  has_many :invitations, foreign_key: :recipient_id

  # Validations (Devise already takes care of things like password length or email format validation)
  validates :username, :email, :password, presence: true
  validates :username, :email, uniqueness: { case_sensitive: false }
  validates :username, length: { in: 3..15 }

  # Check if user is the admin (creator) of a specific group
  def admin?(group)
    self == group.admin
  end
end
