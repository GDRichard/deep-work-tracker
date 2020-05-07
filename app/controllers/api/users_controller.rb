module Api
  class UsersController < ApplicationController
    include SessionsConcerns

    def create
      @user = User.new(user_params)

      if @user.save
        log_in @user
        render json: { status: :created }
      else
        render json: { error_messages: @user.errors.full_messages }
      end
    end

    private

      def user_params
        params.permit(:email, :password, :password_confirmation)
      end
  end
end