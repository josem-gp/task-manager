class Api::V1::UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # Only the current user can update itself
  def update?
    record == user
  end
end
