class InvitationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # Only users belonging to the group can see the invitations (linked with Invitation controller and not with Group controller)
  def index?
    record.group.users.include?(user)
  end
end
