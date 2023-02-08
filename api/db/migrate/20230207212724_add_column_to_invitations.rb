class AddColumnToInvitations < ActiveRecord::Migration[7.0]
  def change
    add_column :invitations, :disabled, :boolean, default: false
  end
end
