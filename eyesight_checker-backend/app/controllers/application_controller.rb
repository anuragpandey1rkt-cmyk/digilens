class ApplicationController < ActionController::API
  

    # def current_user
    #     User.find_by(id:session[:user_id])
    # end

    # def logged_in?
    #     !!current_user
    # end

    # def require_login
    #     unless logged_in?
    #       redirect_to root_path
    #     end
    # end

# Methods we built in controller do not permeate to our ActionView. 
# We cannot call it in our html.erb.
# Need to add the folowing:
    # helper_method :current_user    
end

