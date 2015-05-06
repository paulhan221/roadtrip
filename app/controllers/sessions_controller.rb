class SessionsController < ApplicationController

 def new
   redirect_to '/auth/facebook'
 end

 def create
   user = User.find_by_provider_and_uid(auth["provider"], auth["uid"]) || User.create_with_omniauth(auth)
   log_in(user)
   redirect_to root_path
 end

 def auth
   request.env['omniauth.auth']
 end

 def destroy
   log_out
   redirect_to root_path
 end
end