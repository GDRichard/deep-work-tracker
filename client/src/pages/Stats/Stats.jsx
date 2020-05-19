import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ToggleButtons from "../../components/ToggleButtons/ToggleButtons";
import useAuthentication from "../../custom-hooks/useAuthentication";
import BarChart from "../../visualizations/BarChart/BarChart";

import classes from "./Stats.module.css";

const dayView = "Day";
const weekView = "Week";

const Stats = React.memo(() => {
  const [activeView, setActiveView] = useState(dayView);
  const [deepWorkSessionsData, setDeepWorkSessionsData] = useState({
    Day: [],
    Week: [],
  });
  const { isUserLoggedIn } = useAuthentication();

  useEffect(() => {
    getUserDeepWorkData();
    // eslint-disable-next-line
  }, []);

  const getUserDeepWorkData = () => {
    axios
      .get("/api/deep_work_sessions", {
        withCredentials: true,
      })
      .then((response) => {
        setDeepWorkSessionsData({
          Day: response.data.deep_work_sessions_days,
          Week: response.data.deep_work_sessions_weeks,
        });
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  const handleToggle = (toggleBtnName) => {
    setActiveView(toggleBtnName);
  };

  return (
    <div className={classes.Stats}>
      {isUserLoggedIn ? (
        <>
          <ToggleButtons
            names={[dayView, weekView]}
            handleToggle={handleToggle}
            activeButton={activeView}
          />
          <h3>Deep Work Time per {activeView}</h3>
          <BarChart
            data={deepWorkSessionsData[activeView]}
            activeView={activeView}
          />
        </>
      ) : (
        <p>
          <Link to="/login">Login</Link> or <Link to="/register">Sign up</Link>{" "}
          to view your stats!
        </p>
      )}
    </div>
  );
});

export default Stats;
