import React from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navigation/Navbar/Navbar";
import Routes from "./Routes";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Navbar />
      <Routes />
    </AuthContextProvider>
  </BrowserRouter>
);

export default App;
