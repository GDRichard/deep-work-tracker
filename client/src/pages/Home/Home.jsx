import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import axios from "axios";

import classes from "./Home.module.css";
import ToggleButtons from "../../components/ToggleButtons/ToggleButtons";
import Timer from "../../components/Timer/Timer";
import TimerSettings from "../../components/Timer/TimerSettings/TimerSettings";
import { useInterval } from "../../custom-hooks/useInterval";
import useAuthentication from "../../custom-hooks/useAuthentication";

import Alarm from "../../assets/sounds/Twin-bell-alarm-clock.mp3";

const workTimer = "Work";
const breakTimer = "Break";

const Home = () => {
  const [workTimerDuration, setWorkTimerDuration] = useState(25);
  const [breakTimerDuration, setBreakWorkTimerDuration] = useState(5);
  const [minutesLeft, setMinutesLeft] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [activeTimer, setActiveTimer] = useState(workTimer);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAutoStartWorkTimerOn, setIsAutoStartWorkTimerOn] = useState(false);
  const [isAutoStartBreakTimerOn, setIsAutoStartBreakTimerOn] = useState(false);

  const { isUserLoggedIn } = useAuthentication();

  /**
   * Ask user for permission to send notifications upon opening page
   */
  useEffect(() => {
    if (!window.Notification) {
      alert("Your browser does not support notifications");
    } else if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  /**
   * Sets the timer on or off
   */
  useInterval(
    () => {
      timerCountdown();
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Decrements the timer's minutes & seconds and notifies the user once done.
   */
  const timerCountdown = () => {
    if (minutesLeft === 0 && secondsLeft === 0) {
      if (Notification.permission === "granted") {
        notifyUser();
      }

      // Save session data for user if session was a work session
      if (isUserLoggedIn && activeTimer === workTimer) {
        saveUserDeepWorkSession();
      }

      // Check if next timer is set to start automatically
      if (activeTimer === workTimer && isAutoStartBreakTimerOn) {
        setBreakTimerActive();
      } else if (activeTimer === breakTimer && isAutoStartWorkTimerOn) {
        setWorkTimerActive();
      } else {
        setIsTimerRunning(false);
      }
    } else if (secondsLeft === 0) {
      setMinutesLeft(minutesLeft - 1);
      setSecondsLeft(59);
    } else {
      setSecondsLeft(secondsLeft - 1);
    }
  };

  /**
   * Sends a POST request to the API to save the user's deep work session data.
   */
  const saveUserDeepWorkSession = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/deep_work_sessions",
        { time_in_seconds: workTimerDuration * 60 },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(`Error saving work session: ${error}`);
    }
  };

  /**
   * Displays a notification on the user's screen. Should only be used if user
   * has allowed notifications to be displayed.
   */
  const notifyUser = () => {
    const sound = new Howl({
      src: [Alarm],
    });
    sound.play();

    return new Notification("Productivity-Tracker", {
      body: `Your ${
        activeTimer === workTimer ? "deep work session" : "break"
      } is done!`,
    });
  };

  /**
   * Initialize timer by setting interval that calls the countdown() function
   * every second.
   */
  const startTimer = () => {
    setIsTimerRunning(true);
  };

  /**
   * Stop the timer by clearing the interval set in startTimer()
   */
  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  /**
   * Reset the timer to the itial value of the chosen timer (work vs break)
   */
  const resetTimer = () => {
    setMinutesLeft(
      activeTimer === workTimer ? workTimerDuration : breakTimerDuration
    );
    resetSeconds();
  };

  /**
   * Sets the seconds to 0 and also sets the isTimerRunning flag to false as the
   * two go hand in hand (i.e., if the seconds get reset to 0, then
   * the timer is off or turning off as well).
   */
  const resetSeconds = () => {
    setSecondsLeft(0);
    setIsTimerRunning(false);
  };

  /**
   * Handler for changing the duration of the work/break timer
   */
  const handleDurationChange = (event) => {
    const newDuration = Number(event.target.value);
    const inputName = event.target.name;

    // Ensure input is positive integer
    if (Number.isInteger(newDuration) && newDuration >= 0) {
      resetTimer();
      /**
       * Check which timer is selected to determine if the change in duration
       * should be displayed (i.e., if work timer is selected and work time
       * duration is changed, update the timer display accordingly)
       */
      if (inputName === "workTimerDuration") {
        setNewWorkTimerDuration(newDuration);
      } else {
        setNewBreakTimerDuration(newDuration);
      }
    } else {
      alert("Please enter a positive integer value");
    }
  };

  /**
   * Sets a new work timer duration
   */
  const setNewWorkTimerDuration = (newDuration) => {
    setWorkTimerDuration(newDuration);
    setMinutesLeft(activeTimer === workTimer ? newDuration : minutesLeft);
  };

  /**
   * Sets a new break timer duration
   */
  const setNewBreakTimerDuration = (newDuration) => {
    setBreakWorkTimerDuration(newDuration);
    setMinutesLeft(activeTimer === breakTimer ? newDuration : minutesLeft);
  };

  /**
   * Handler for toggling between the work and break timer
   */
  const toggleTimerHandler = (toggleBtnName) => {
    if (toggleBtnName === workTimer) {
      setWorkTimerActive();
    } else {
      setBreakTimerActive();
    }
    resetSeconds();
  };

  /**
   * Updates the state to reflect that the work timer is selected
   */
  const setWorkTimerActive = () => {
    setActiveTimer(workTimer);
    setMinutesLeft(workTimerDuration);
  };

  /**
   * Updates the state to reflect that the break timer is selected
   */
  const setBreakTimerActive = () => {
    setActiveTimer(breakTimer);
    setMinutesLeft(breakTimerDuration);
  };

  /**
   * Sets whether the Work Timer automatically starts or not once the Break Timer is done
   */
  const handleAutoStartWorkToggle = () => {
    setIsAutoStartWorkTimerOn(!isAutoStartWorkTimerOn);
  };

  /**
   * Sets whether the Break Timer automatically starts or not once the Work Timer is done
   */
  const handleAutoStartBreakToggle = () => {
    setIsAutoStartBreakTimerOn(!isAutoStartBreakTimerOn);
  };

  return (
    <div className={classes.Home}>
      <ToggleButtons
        names={[workTimer, breakTimer]}
        handleToggle={toggleTimerHandler}
        activeButton={activeTimer}
      />
      <Timer
        minutes={minutesLeft}
        seconds={secondsLeft}
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
      <TimerSettings
        workTimerDuration={workTimerDuration}
        breakTimerDuration={breakTimerDuration}
        handleDurationChange={handleDurationChange}
        handleAutoStartBreakToggle={handleAutoStartBreakToggle}
        handleAutoStartWorkToggle={handleAutoStartWorkToggle}
      />
    </div>
  );
};

export default Home;
