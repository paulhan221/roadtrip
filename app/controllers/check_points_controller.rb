class CheckPointsController < ApplicationController

  def new
    @checkpoint = CheckPoint.new(checkpoint_params_for_new)
    @yelpdata = Yelp.client.search_by_coordinates({latitude: "#{@checkpoint.latitude}", longitude: "#{@checkpoint.longitude}"}, { term: 'restaurants', limit: 10, sort: 1 })

    @businesses = []
    @yelp_url = ""
    @yelpdata.raw_data["businesses"].each do |business|
      if business["name"] == @checkpoint.name
        @yelp_url = business['url']
      end
    end
    @yelp_url
  end

  def show
    @checkpoint = CheckPoint.find(params[:id])
    # @yelpdata = Yelp.client.business("name: Chipotle")
  end

  def create
    @checkpoint = CheckPoint.new(checkpoint_params)
    respond_to do |format|
      if @checkpoint.save
        format.html { redirect_to @checkpoint, notice: 'checkpoint was successfully created.' }
        format.json { render :show, status: :created, location: @checkpoint }
      else
        format.html { render :new }
        format.json { render json: @checkpoint.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def checkpoint_params_for_new
    params.permit(:name, :address, :trip_id, :latitude, :longitude)
  end

  def checkpoint_params
    params.require(:check_point).permit(:name, :address, :trip_id, :latitude, :longitude)
  end

end
