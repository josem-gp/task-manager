class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :groups, foreign_key: :admin_id, dependent: :destroy # If we delete the user (if admin), then the group will be also deleted
  has_many :members
  has_many :groups, through: :members
end
