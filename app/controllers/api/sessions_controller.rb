module Api
  class SessionsController < ApplicationController
    include ActionController::Cookies
    include SessionsConcerns

    def login
      user = User.find_by(email: params[:email].downcase)

      if user && user.authenticate(params[:password])
        log_in user
        remember user if params[:remember_me]
        
        render json: { 
          status: :ok, 
          logged_in: true 
        }
      else
        render json: { 
          error_messages: "Invalid email/password combination", 
          status: 401,
          logged_in: false 
        }
      end
    end

    def logout
      log_out if logged_in?

      render json: {
        status: :ok,
        logged_in: false
      }
    end

    def is_logged_in?
      if logged_in?
        render json: { logged_in: true }
      else
        render json: { logged_in: false }
      end
    end
  end
end
