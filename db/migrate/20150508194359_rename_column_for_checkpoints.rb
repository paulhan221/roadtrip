class RenameColumnForCheckpoints < ActiveRecord::Migration
  def change
    rename_column :check_points, :roadtrip_id, :trip_id
  end
end
