import React from "react";

import classes from "./TimerSettings.module.css";

const timerSettings = React.memo((props) => {
  return (
    <div className={classes.TimerSettingsContainer}>
      <form>
        <div className={classes.FlexRow}>
          <label htmlFor="workTimerDurationId">Work Duration:</label>
          <input
            type="number"
            id="workTimerDurationId"
            name="workTimerDuration"
            value={props.workTimerDuration}
            onChange={props.handleDurationChange}
          />
        </div>

        <div className={classes.FlexRow}>
          <label htmlFor="breakTimerDurationId">Break Duration:</label>
          <input
            type="number"
            id="breakTimerDurationId"
            name="breakTimerDuration"
            value={props.breakTimerDuration}
            onChange={props.handleDurationChange}
          />
        </div>

        <div className={classes.FlexRow}>
          <span>Auto-Start Break Timer</span>
          <div>
            <label className={classes.Switch}>
              <input
                type="checkbox"
                onChange={props.handleAutoStartBreakToggle}
              />
              <span className={classes.RoundSlider}></span>
            </label>
          </div>
        </div>

        <div className={classes.FlexRow}>
          <span>Auto-Start Work Timer</span>
          <div>
            <label className={classes.Switch}>
              <input
                type="checkbox"
                onChange={props.handleAutoStartWorkToggle}
              />
              <span className={classes.RoundSlider}></span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
});

export default timerSettings;
