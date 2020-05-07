import React from "react";

import classes from "./FormButton.module.css";

const formButton = ({ value }) => (
  <input type="submit" value={value} className={classes.FormButton} />
);

export default formButton;
