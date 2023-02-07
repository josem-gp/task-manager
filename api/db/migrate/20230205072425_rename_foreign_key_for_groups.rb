class RenameForeignKeyForGroups < ActiveRecord::Migration[7.0]
  def change
    rename_column :groups, :user_id, :admin_id
  end
end
