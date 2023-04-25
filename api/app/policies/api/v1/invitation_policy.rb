class Api::V1::InvitationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # Only if current user is the sender (that also means that current user is admin)
  def disable_invitation?
    record.sender == user
  end
end
