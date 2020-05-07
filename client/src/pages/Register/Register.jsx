import React, { useState } from "react";
import axios from "axios";

import FormButton from "../../components/FormButton/FormButton";
import useAuthentication from "../../custom-hooks/useAuthentication";

import classes from "./Register.module.css";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const { handleLogin } = useAuthentication();

  const handleSubmit = (event) => {
    event.preventDefault();

    /**
     * Send a POST request to API to register a new user. If successfull, user
     * will be logged in and saved to AuthContext, followed by a redirect to the
     * Home page.
     */
    axios
      .post(
        "http://localhost:3001/api/register",
        {
          email,
          password,
          password_confirmation,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          // Save user data in AuthContext
          handleLogin();
          history.push("/home");
        } else {
          // Display error messages
          setErrorMessages(response.data.error_messages);
        }
      })
      .catch((error) => {
        console.log("Registration error:", error);
      });
  };

  return (
    <div className={classes.RegisterContainer}>
      <h1>Sign Up</h1>
      <ul>
        {errorMessages
          ? errorMessages.map((errorMsg) => <li>{errorMsg}</li>)
          : null}
      </ul>
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

        <label>
          <strong>Password</strong>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          <strong>Confirm Password</strong>
          <input
            name="password_confirmation"
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </label>

        <FormButton value="Sign Up" />
      </form>
    </div>
  );
};

export default Register;
