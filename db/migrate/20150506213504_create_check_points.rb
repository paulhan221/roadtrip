class CreateCheckPoints < ActiveRecord::Migration
  def change
    create_table :check_points do |t|
      t.belongs_to :user
      t.belongs_to :roadtrip
      t.timestamps null: false  
    end
  end
end
