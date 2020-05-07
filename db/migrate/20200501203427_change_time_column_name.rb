class ChangeTimeColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :deep_work_sessions, :time, :time_in_seconds
  end
end
