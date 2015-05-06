class User < ActiveRecord::Base
  has_many :reviews
  has_many :roadtrips
  has_many :check_points, through: :roadtrips  
  
  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
      user.image = auth["info"]["image"]
    end
  end
end
