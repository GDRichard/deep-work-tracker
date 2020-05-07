class CreateDeepWorkSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :deep_work_sessions do |t|
      t.integer :time
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :deep_work_sessions, [:user_id, :created_at]
  end
end
