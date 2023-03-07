class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :validatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  # Associations
  has_many :groups_as_admin, foreign_key: :admin_id, class_name: "Group", dependent: :destroy # If we delete the user (if admin), then the group will be also deleted
  has_many :memberships
  has_many :groups, through: :memberships
  has_many :tasks
  has_many :tasks, foreign_key: :assignee_id # Tasks will have one assignee per task
  has_many :tags
  has_many :invitations, foreign_key: :sender_id
  has_many :invitations, foreign_key: :recipient_id
  belongs_to :icon

  # Validations (Devise already takes care of things like password length or email format validation)
  validates :username, presence: true
  validates :username, :email, uniqueness: { case_sensitive: false }
  validates :username, length: { in: 3..15 }

  # Callbacks
  before_validation :add_default_icon, on: :create
  after_create :send_registration_email

  # Check if user is the admin (creator) of a specific group
  def admin?(group)
    self == group.admin
  end

  private

  def add_default_icon
    default_icon = Icon.find_by(name: 'default_icon')
    self.icon = default_icon
  end

  def send_registration_email
    UserConfirmationMailer.with(user: self).user_registration_email.deliver_later
  end 
end
