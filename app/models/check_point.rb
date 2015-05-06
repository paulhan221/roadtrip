class CheckPoint < ActiveRecord::Base
  belongs_to :user
  belongs_to :roadtrip
  has_many :reviews
end
