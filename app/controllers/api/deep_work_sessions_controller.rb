module Api
  class DeepWorkSessionsController < ApplicationController
    include SessionsConcerns

    # Returns two hash objects. The first contains the time worked in seconds per
    # the past 14 days (today included). The second hash contains the time 
    # worked in seconds per the past 14 weeks (this week included).
    def index
      get_deep_work_sessions_for_day_view
      get_deep_work_sessions_for_week_view

      render json: { 
        status: :ok,
        deep_work_sessions_days: @deep_work_sessions_days,
        deep_work_sessions_weeks: @deep_work_sessions_weeks
      }
    end

    # Stores the Deep Work session data in the DB.
    def create
      @deep_work_session = current_user.deep_work_sessions.build(
        deep_work_session_params
      )

      if @deep_work_session.save
        render json: { status: :ok }
      else
        render json: { 
          status: 401, 
          error_messages: @deep_work_session.errors.full_messages 
        }
      end
    end

    private
      THIRTEEN_DAYS_AGO = 13.days.ago.to_date
      # Value for the Sunday of 13 weeks ago as the weeks will be calculated  
      # from the Sunday of 13 weeks ago to the end of the current week
      THIRTEEN_WEEKS_AGO = 91.days.ago.to_date - 91.days.ago.to_date.wday
      
      # Returns the results for the Day view in the Stats page in a hash with
      # the keys being the past 14 days (today included) and the values being 
      # the time worked per day. 
      def get_deep_work_sessions_for_day_view
        results = current_user.deep_work_sessions.where(
          "created_at < ? AND created_at > ?", Date.tomorrow, THIRTEEN_DAYS_AGO)

        # Calculate the total time worked per day.
        total_time_by_day = {}
        results.each do |row|
          date = row.created_at.to_date
          total_time_by_day[date] = 0 if total_time_by_day[date].nil?
          total_time_by_day[date] += row.time_in_seconds / 60.seconds
        end

        # Prepare hash for the front-end with the total time worked per the 
        # past 14 days.
        @deep_work_sessions_days = []
        (0..13).each do |i|
          date = THIRTEEN_DAYS_AGO + i
          @deep_work_sessions_days[i] = { 
            date: date,
            time: total_time_by_day[date].nil? ? 0 : total_time_by_day[date],
            title_date: date 
           }
        end
      end
        
      # Returns the results for the Week view in the Stats page in a hash with
      # the keys being the Sunday of the past 14 weeks (this week included) 
      # and the values being the time worked per day. 
      def get_deep_work_sessions_for_week_view
        results = current_user.deep_work_sessions.where(
          "created_at < ? AND created_at > ?", Date.tomorrow, THIRTEEN_WEEKS_AGO)

        # Calculate the total time worked per week.
        total_time_by_week = {}
        results.each do |row|
          date = row.created_at.to_date
          first_day_of_week = date - date.wday
          
          total_time_by_week[first_day_of_week] = 0 if 
            total_time_by_week[first_day_of_week].nil?

          total_time_by_week[first_day_of_week] += 
            row.time_in_seconds / 60.seconds
        end

        # Prepare the hash for the front-end with the total time worked per the
        # past 14 weeks.
        @deep_work_sessions_weeks = []
        (0..13).each do |i|
          first_day_of_week = THIRTEEN_WEEKS_AGO + (i * 7)
          last_day_of_week = first_day_of_week + 6

          @deep_work_sessions_weeks[i] = {
            date: first_day_of_week,
            time: total_time_by_week[first_day_of_week].nil? ? 
                  0 : total_time_by_week[first_day_of_week],
            title_date: "#{first_day_of_week} - #{last_day_of_week}"
          }
        end
      end

      def deep_work_session_params
        params.permit(:time_in_seconds)
      end

  end
end
