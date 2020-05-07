require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest

  test "invalid signup information" do
    assert_no_difference 'User.count' do
      post api_register_path, params: { 
        email: "user@invalid", 
        password: "foo", 
        password_confirmation: "bar" 
      }
    end
    assert_response :success, @response.body
    assert_not is_logged_in?
  end

  test "valid signup information" do
    assert_difference 'User.count', 1 do
      post api_register_path, params: {
        email: "hello@world.ca",
        password: "asdfasdf",
        password_confirmation: "asdfasdf"
      }
    end
    assert_response :success, @response.body
    assert is_logged_in?
  end
end
