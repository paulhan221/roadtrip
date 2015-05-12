class CheckPointsController < ApplicationController

  def new
    @checkpoint = CheckPoint.new(checkpoint_params_for_new)
    @yelp_url = ""
    @businesses = []
    if @checkpoint.latitude || @checkpoint.longitude
      @yelpdata = Yelp.client.search_by_coordinates({latitude: "#{@checkpoint.latitude}", longitude: "#{@checkpoint.longitude}"}, {limit: 20, sort: 1, radius_filter: 40000 })
      @yelpdata.raw_data["businesses"].each do |business|
        if (@checkpoint.name.include?(business["name"][0..5]) || business["name"].include?(@checkpoint.name[0..5]))
          @yelp_url = business['url']
          @image = business["image_url"]
          @rating = business["rating"]
          @number = business["display_phone"].gsub("+","")
          @review_count = business["review_count"]
          @stars = business["rating_img_url_large"]
        end
      end
    end
    @yelp_url
  end

  def show
    @checkpoint = CheckPoint.find(params[:id])
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

  def create
    @checkpoint = CheckPoint.new(checkpoint_params)
    respond_to do |format|
      if @checkpoint.save
        format.html { redirect_to @checkpoint.trip, notice: 'checkpoint was successfully created.' }
        format.json { render :show, status: :created, location: @checkpoint }
      else
        format.html { render :new }
        format.json { render json: @checkpoint.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @checkpoint = CheckPoint.find(params[:id])
    @checkpoint.destroy
    respond_to do |format|
      format.html { redirect_to :back, notice: 'checkpoint item was successfully removed.' }
      format.json { head :no_content }
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
