class GroupPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # Only users belonging to the group can see it
  def show?
    record.users.include?(user)
  end

  # Only admin can update it
  def update?
    record.admin == user
  end

  # Only admin can destroy it
  def destroy?
    record.admin == user
  end
end
