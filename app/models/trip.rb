class Trip < ActiveRecord::Base
  belongs_to :user
  has_many :check_points
  validates_presence_of :user_id, :origin, :destination, :name
end
