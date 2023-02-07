class Invitation < ApplicationRecord
  has_secure_token :oauth_token, length: 36 # Rails built-in method (https://api.rubyonrails.org/classes/ActiveRecord/SecureToken/ClassMethods.html#method-i-has_secure_token)

  # Associations
  belongs_to :group
  belongs_to :sender, class_name: "User", foreign_key: :sender_id
  belongs_to :recipient, class_name: "User", foreign_key: :recipient_id, optional: true # we don't have it until the potential user signs up

  # Validations
  validates :email, presence: true
  validates :email, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "please input a valid email" } # Just confirms that email has @ in it
  validate :valid_invitation?

  # Callbacks
  after_create :generate_token_expiration 

  private

  # Validate invitation before creation
  def valid_invitation?
    invitation_user = self.sender
    invitation_group = self.group

    if !invitation_user.groups.exists?(id: invitation_group.id)
      errors.add(:sender, "doesn't belong to this invitation's group.")
    elsif !invitation_user.admin?(invitation_group)
      errors.add(:sender, "is not an admin. Only admins can send invitations.")
    end
  end

  # After validation, we generate the token expiration date
  def generate_token_expiration
    # Expiration date will be a week from the moment the class is instantiated
    self.expiration_date = (DateTime.now + 7).strftime("%d/%m/%Y") 
    self.save!
  end
end
