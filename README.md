# Deep Work Tracker

## About

[Deep Work Tracker](https://deepworktracker.herokuapp.com/) is productivity app
inspired by the Deep Work philosophy of [Cal Newport](https://www.calnewport.com/).
In the past, I've used many Pomodoro timers during my deep work sessions to help
me focus and get into flow. I would then track these sessions in an excel file.
My intent with Deep Work Tracker is to build an app that takes care of both of
these things.

**Note:** Deep Work Tracker is very much a work in progress. More to come!

## How it works

Set the desired length of your deep work session and start the timer. Once the
timer is done, you will get a notification that your session is done. If you're
logged in, the app will record the duration of your session and you can review
your records in the Stats page.

![The Day view in the Stats page](/assets/images/stats.png)

## How to run locally

Once you've cloned the repo to your local directory of choice, open a terminal
at the root of the project and run the command `bundle`. Once that's done,
install the client dependencies by running the command `yarn --cwd client install`.
Finally, enter `rake start` to start up the application.
