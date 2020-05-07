import React from "react";

import classes from "./Timer.module.css";

const timer = ({ minutes, seconds, startTimer, stopTimer, resetTimer }) => (
  <div>
    <div className={classes.Timer}>
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
    <div className={classes.TimerButtons}>
      <button className={classes.ButtonStart} onClick={startTimer}>
        Start
      </button>
      <button className={classes.ButtonStop} onClick={stopTimer}>
        Stop
      </button>
      <button className={classes.ButtonReset} onClick={resetTimer}>
        Reset
      </button>
    </div>
  </div>
);

export default timer;
