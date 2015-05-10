class CheckPointsController < ApplicationController

  def new
    @checkpoint = CheckPoint.new(checkpoint_params_for_new)
    @yelpdata = Yelp.client.search_by_coordinates({latitude: "#{@checkpoint.latitude}", longitude: "#{@checkpoint.longitude}"}, { term: "food, restaurants",limit: 20, sort: 1, radius_filter: 40000 })
    @yelp_url = ""
    @yelpdata.raw_data["businesses"].each do |business|
      if (@checkpoint.name.include?(business["name"][0..5]) || business["name"].include?(@checkpoint.name[0..5]))
        @yelp_url = business['url']
        @image = business["image_url"]
        @rating = business["rating"]
        @number = business["phone"]
        @review_count = business["review_count"]
        @stars = business["rating_img_url_large"]
      end
    end
    @yelp_url
  end

  def show
    @checkpoint = CheckPoint.find(params[:id])
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
