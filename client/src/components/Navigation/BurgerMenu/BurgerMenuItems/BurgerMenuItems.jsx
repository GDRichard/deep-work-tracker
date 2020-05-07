import React from "react";

import NavigationItems from "../../NavigationItems/NavigationItems";

import classes from "./BurgerMenuItems.module.css";

const burgerMenuItems = ({
  isBurgerMenuOpen,
  setIsBurgerMenuOpen,
  isUserLoggedIn,
  handleLogout,
}) => {
  let assignedClasses = [classes.BurgerMenuItems, classes.HideBurgerMenu];
  if (isBurgerMenuOpen) {
    assignedClasses = [classes.BurgerMenuItems, classes.ShowBurgerMenu];
  }

  return (
    <nav className={assignedClasses.join(" ")}>
      <NavigationItems
        isBurgerMenuOpen={isBurgerMenuOpen}
        setIsBurgerMenuOpen={setIsBurgerMenuOpen}
        isUserLoggedIn={isUserLoggedIn}
        handleLogout={handleLogout}
        isMobile={true}
      />
    </nav>
  );
};

export default burgerMenuItems;
