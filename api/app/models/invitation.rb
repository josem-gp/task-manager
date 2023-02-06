class Invitation < ApplicationRecord
  belongs_to :group
  belongs_to :sender, class_name: "User", foreign_key: :sender_id
  belongs_to :recipient, class_name: "User", foreign_key: :recipient_id, optional: true # we don't have it until the potential user signs up

  validate :save_invitation?

  private

  # Validate invitation before creation
  def save_invitation?
    invitation_user = self.sender
    invitation_group = self.group

    if !invitation_user.groups.exists?(id: invitation_group.id)
      errors.add(:sender, "doesn't belong to this invitation's group.")
    elsif !invitation_user.admin?(invitation_group)
      errors.add(:sender, "is not an admin. Only admins can send invitations.")
    end
  end
end
