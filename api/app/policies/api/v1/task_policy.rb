class Api::V1::TaskPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # Only users belonging to the group can see the task
  def show?
    record.group.users.include?(user)
  end

  # Only users belonging to the group can create a task for that group
  def create?
    if record.group # if user doesn't add a group to the task when creating it, we return false (which gives auth error)
      if record.assignee
        record.group.users.include?(user) && record.group.users.include?(record.assignee) 
      else
        record.group.users.include?(user)
      end
    else
      false
    end
  end

  # Only users belonging to the group can update a task
  def update?
    if record.assignee
      record.group.users.include?(user) && record.group.users.include?(record.assignee) 
    else
      record.group.users.include?(user)
    end
  end

  # Only users belonging to the group can destroy a task
  def destroy?
    record.group.users.include?(user)
  end
end
