class Tag < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :tagged_tasks
end
