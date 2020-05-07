import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavigationItems from "../NavigationItems/NavigationItems";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import BurgerMenuItems from "../BurgerMenu/BurgerMenuItems/BurgerMenuItems";
import useAuthentication from "../../../custom-hooks/useAuthentication";

import classes from "./Navbar.module.css";

const Navbar = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { isUserLoggedIn, handleLogout } = useAuthentication();

  return (
    <nav className={classes.Navbar}>
      <h1>
        <Link to="/" onClick={() => setIsBurgerMenuOpen(false)}>
          Deep Work Tracker
        </Link>
      </h1>

      <div className={classes.DesktopOnly}>
        <NavigationItems
          setIsBurgerMenuOpen={setIsBurgerMenuOpen}
          isMobile={false}
          isUserLoggedIn={isUserLoggedIn}
          handleLogout={handleLogout}
        />
      </div>

      <BurgerMenu
        isBurgerMenuOpen={isBurgerMenuOpen}
        setIsBurgerMenuOpen={setIsBurgerMenuOpen}
      />
      <BurgerMenuItems
        isBurgerMenuOpen={isBurgerMenuOpen}
        setIsBurgerMenuOpen={setIsBurgerMenuOpen}
        isUserLoggedIn={isUserLoggedIn}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
