class CreateInvitations < ActiveRecord::Migration[7.0]
  def change
    create_table :invitations do |t|
      t.string :email
      t.date :expiration_date
      t.text :oauth_token
      t.references :group, null: false, foreign_key: true
      t.references :sender, null: false, foreign_key: { to_table: :users}
      t.references :recipient, null: true, foreign_key: { to_table: :users} # It can be null in the beginning since we still don't have the potential user signed up

      t.timestamps
    end
  end
end
