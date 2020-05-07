import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Stats from "./pages/Stats/Stats";
import Register from "./pages/Register/Register";

const routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect from="/home" to="/" />
    <Route path="/login" component={Login} />
    <Route path="/stats" component={Stats} />
    <Route path="/register" component={Register} />
  </Switch>
);

export default routes;
