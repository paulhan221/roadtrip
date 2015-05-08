class CheckPoint < ActiveRecord::Base
  belongs_to :trip
  has_many :reviews
end
