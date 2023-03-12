class Api::V1::Groups::TaskPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # Only users belonging to the group can create a task
  def create?
    if record.assignee
      record.group.users.include?(user) && record.group.users.include?(record.assignee) 
    else
      record.group.users.include?(user)
    end
  end
end
