class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :note
      t.date :due_date
      t.boolean :finished
      t.references :group, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :assignee, null: false, foreign_key: { to_table: :users}

      t.timestamps
    end
  end
end
