module SessionsConcerns
  extend ActiveSupport::Concern
    
  # Logs in the given user
  def log_in(user)
    session[:user_id] = user.id
  end

  # Remember the given user via cookie
  def remember(user)
    user.remember
    cookies.permanent.encrypted[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  # Returns the currently logged in user
  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)

    elsif (user_id = cookies.encrypted[:user_id])
      user = User.find_by(id: user_id)

      if user && user.authenticated?(cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  # Returns true if a user is logged in, false othwerwise
  def logged_in?
    !current_user.nil?
  end

  # Forgets a persistant session
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  # Logs out the current user
  def log_out
    forget current_user
    reset_session
    @current_user = nil
  end
end