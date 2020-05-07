import React from "react";

import classes from "./ToggleButtons.module.css";

const ToggleButtons = React.memo(({ names, handleToggle, activeButton }) => {
  return (
    <div className={classes.ToggleButtons}>
      {names.map((name, index) => (
        <button
          key={index}
          name={name}
          className={activeButton === name ? classes.Active : classes.Inactive}
          onClick={(event) => handleToggle(event.target.name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
});

export default ToggleButtons;
