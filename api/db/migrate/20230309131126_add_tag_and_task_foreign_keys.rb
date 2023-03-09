class AddTagAndTaskForeignKeys < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :tag, null: true, foreign_key: true
    add_reference :tags, :task, null: true, foreign_key: true
  end
end
