class AddColumnsToCheckpoints < ActiveRecord::Migration
  def change
    add_column :check_points, :address, :string
    add_column :check_points, :name, :string
    remove_column :check_points, :user_id, :integer
  end
end
