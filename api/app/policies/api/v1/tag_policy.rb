class Api::V1::TagPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # Only users belonging to the group can see the tags
  def index?
    record.group.users.include?(user)
  end

  # Only users belonging to the group can create a tag
  def create?
    record.group.users.include?(user)
  end

  # Only users belonging to the group can update a tag
  def update?
    record.group.users.include?(user)
  end

  # Only users belonging to the group can destroy a tag
  def destroy?
    record.group.users.include?(user)
  end
end
