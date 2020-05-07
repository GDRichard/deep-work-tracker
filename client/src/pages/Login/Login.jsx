import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FormButton from "../../components/FormButton/FormButton";
import useAuthentication from "../../custom-hooks/useAuthentication";

import classes from "./Login.module.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember_me, setRememberMe] = useState(true);
  const [errorMessages, setErrorMessages] = useState("");

  const { handleLogin } = useAuthentication();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3001/api/login",
        { email, password, remember_me },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "ok") {
          // Save user data in AuthContext
          handleLogin();
          history.push("/home");
        } else {
          // Display error messages
          setErrorMessages(response.data.error_messages);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={classes.LoginContainer}>
      <h1>Login</h1>
      <ul>{errorMessages ? <li>{errorMessages}</li> : null}</ul>
      <br />

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Email</strong>
          <input
            name="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor="password">
          <strong>Password</strong>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <FormButton value="Login" />

        <label htmlFor="remember">
          <input
            type="checkbox"
            defaultChecked={true}
            name="remember"
            onChange={() => setRememberMe(!remember_me)}
          />{" "}
          Remember me
        </label>
      </form>

      <ul className={classes.Links}>
        <li>
          <Link to="/register">Register new account</Link>
        </li>
      </ul>
    </div>
  );
};

export default Login;
