import React from "react";

import classes from "./BurgerMenu.module.css";

const burgerMenu = ({ isBurgerMenuOpen, setIsBurgerMenuOpen }) => {
  let assignedClasses = [classes.BurgerMenu, classes.Close];
  if (isBurgerMenuOpen) {
    assignedClasses = [classes.BurgerMenu, classes.Open];
  }

  return (
    <button
      className={assignedClasses.join(" ")}
      onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
    >
      <div />
      <div />
      <div />
    </button>
  );
};

export default burgerMenu;
