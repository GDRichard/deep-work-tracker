user = User.first
THIRTEEN_WEEKS_AGO = 91.days.ago.to_date
(0..91).each do |i|
  time_in_seconds = 300 + rand(7000)
  user.deep_work_sessions.create(time_in_seconds: time_in_seconds, created_at: THIRTEEN_WEEKS_AGO + i)
end