import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const useAuthentication = () => {
  const [authState, setAuthState] = useContext(AuthContext);

  useEffect(() => {
    getLoggedInStatus();
    // eslint-disable-next-line
  }, []);

  const getLoggedInStatus = () => {
    axios
      .get("/api/logged_in_status", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.logged_in) {
          handleLogin();
        } else {
          handleLogout();
        }
      })
      .catch((error) => {
        console.log("Error fetching login status:", error);
      });
  };

  const handleLogin = () => {
    setAuthState({ isLoggedIn: true });
  };

  const handleLogout = () => {
    setAuthState({ isLoggedIn: false });
  };

  return {
    handleLogin,
    handleLogout,
    isUserLoggedIn: authState.isLoggedIn,
  };
};

export default useAuthentication;
