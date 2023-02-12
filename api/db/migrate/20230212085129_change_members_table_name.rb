class ChangeMembersTableName < ActiveRecord::Migration[7.0]
  def change
    rename_table :members, :memberships
  end
end
