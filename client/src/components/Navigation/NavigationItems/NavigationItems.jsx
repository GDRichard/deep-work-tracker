import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import classes from "./NavigationItems.module.css";

const navigationItems = ({
  isMobile,
  setIsBurgerMenuOpen,
  handleLogout,
  isUserLoggedIn,
}) => {
  let flexDisplay = classes.FlexRow;
  if (isMobile) {
    flexDisplay = classes.FlexColumn;
  }

  /**
   * Sends a DELETE request to the server to remove the user from the session.
   * If the request is successful, updates the auth state of the app to reflect
   * that no user is logged in.
   */
  const handleLogoutRequest = () => {
    axios
      .delete("http://localhost:3001/api/logout", { withCredentials: true })
      .then((response) => {
        // Set to false to close burger menu in case user is on mobile
        setIsBurgerMenuOpen(false);
        handleLogout();
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  return (
    <div className={flexDisplay}>
      <ul className={classes.NavigationList}>
        <li>
          <Link to="/stats" onClick={() => setIsBurgerMenuOpen(false)}>
            Stats
          </Link>
        </li>
        <li>
          {isUserLoggedIn ? (
            <Link
              to="#"
              onClick={() => {
                handleLogoutRequest();
              }}
            >
              Logout
            </Link>
          ) : (
            <Link to="/login" onClick={() => setIsBurgerMenuOpen(false)}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default navigationItems;
