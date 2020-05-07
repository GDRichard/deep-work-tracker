require 'test_helper'

class DeepWorkSessionTest < ActiveSupport::TestCase
  
  def setup
    @user = users(:gabriel)
    @deep_work_session = @user.deep_work_sessions.build(time_in_seconds: 1500)
  end

  test "should be valid" do
    assert @deep_work_session.valid?
  end

  test "user id should be present" do
    @deep_work_session.user_id = nil
    assert_not @deep_work_session.valid?
  end

  test "time for deep work session should be present" do
    @deep_work_session.time_in_seconds = nil
    assert_not @deep_work_session.valid?
  end

  test "time for deep work session should be greater than 0" do
    @deep_work_session.time_in_seconds = 0
    assert_not @deep_work_session.valid?
  end

  test "time for deep work session should be an integer" do
    @deep_work_session.time_in_seconds = 1.23
    assert_not @deep_work_session.valid?
  end
end
