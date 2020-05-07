require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:gabriel)
  end
  
  test "valid login information followed by logout" do
    post api_login_path, params: { email: @user.email, password: 'password' }
    assert_response :success
    assert is_logged_in?
    delete api_logout_path
    assert_response :success, @response.body
    assert_not is_logged_in?
    # Simulate a user clicking logout in a second window
    delete api_logout_path
    assert_not is_logged_in?
  end

  test "invalid login information" do
    post api_login_path, params: { email: @user.email, password: 'incorrect' }
    assert_response :success, @response.body
    assert_not is_logged_in?
  end
end
