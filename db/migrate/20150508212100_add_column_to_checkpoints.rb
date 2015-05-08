class AddColumnToCheckpoints < ActiveRecord::Migration
  def change
    add_column :check_points, :latitude, :float
    add_column :check_points, :longitude, :float
  end
end
