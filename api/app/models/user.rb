class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :groups, foreign_key: :admin_id, dependent: :destroy # If we delete the user (if admin), then the group will be also deleted
  has_many :members
  has_many :groups, through: :members
end
