module SessionsHelper
 def log_in(user)
   session[:user_id] = user.id
 end

 def log_out
   session.delete(:user_id)
   @current_user = nil
 end

 def current_user
   @current_user ||= User.find_by(id: session[:user_id])
 end

 def logged_in?
   !current_user.nil?
 end

 def login_logout_links
   if logged_in?
     link_to 'Logout', logout_path
   else
     link_to 'Log in with Facebook!', login_path
   end
 end
end