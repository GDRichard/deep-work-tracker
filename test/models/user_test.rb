require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(email: "user@example.com", password: "pass1234",
                     password_confirmation: "pass1234")
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "email should be present" do 
    @user.email = "    "
    assert_not @user.valid?
  end

  test "email should not be too long" do
    @user.email = "a" * 244 + "@example.com"
    assert_not @user.valid?
  end

  test "password should be present (nonblank)" do
    @user.password = @user.password_confirmation = " " * 6
    assert_not @user.valid?
  end

  test "password should not be too short" do
    @user.password = @user.password_confirmation = "a" * 5
    assert_not @user.valid?
  end

  test "email should accept valid addresses" do
    valid_addresses = %w[user@example.com HELLO@world.COM A_US-ER@foo.bar.baz
                         one.two@test.ca one+two@wut.jp]
    
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "email should reject invalid addresses" do
    invalid_addresses = %w[user@example,com user_at_example.com user@example
                           one@two_three.com one@two+three.com foo@bar..com]
    
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test "email should be unique" do
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
  end

  test "email should be saved as lower-case" do
    mixed_case_email = "uSeR@examPLE.cOm"
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test "authenticated? should return false for a user with nil digest" do
    assert_not @user.authenticated?('')
  end
end
