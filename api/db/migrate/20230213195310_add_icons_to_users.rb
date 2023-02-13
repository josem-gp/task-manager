class AddIconsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :icon, foreign_key: true
  end
end
