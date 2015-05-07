class WelcomeController < ApplicationController

  def index
    @trip = Trip.new
  end


end
