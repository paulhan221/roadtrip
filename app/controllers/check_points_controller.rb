class CheckPointsController < ApplicationController

  def new
    @checkpoint = CheckPoint.new(check_point_params)
    
    # binding.pry
    # @cp_name = params["name"]
    # @cp_address = params["address"]
    # respond_to do |format|
    #   format.json { render :json => {
    #       :status => 401, 
    #       :success => :true,
    #       :name => @cp_name, 
    #       :address => @cp_address
    #     }
    #   }
    # end
  end

  def create

  end

  private

  def check_point_params
    params.permit(:name, :address, :trip_id)
  end

end
