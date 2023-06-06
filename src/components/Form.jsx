import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    validateForm(name, value);
  };

  const handleBlur = (name, value) => {
    validateForm(name, value);
  };

  console.log(error, userData);

  const validateForm = (name, value) => {
    switch (name) {
      case "firstName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          setError({
            ...error,
            firstName: "First Name should contain only letters",
          });
        } else {
          setError({
            ...error,
            firstName: "",
          });
        }
        break;

      case "lastName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          setError({
            ...error,
            lastName: "Last Name should contain only letters",
          });
        } else {
          setError({
            ...error,
            lastName: "",
          });
        }
        break;

      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          setError({ ...error, email: "Invalid Email format" });
        } else {
          setError({
            ...error,
            email: "",
          });
        }
        break;

      case "password":
        if (value.length < 8) {
          // console.log("hello there");
          setError({
            ...error,
            password: "Password should be at least 8 characters long",
          });
        } else {
          setError({
            ...error,
            password: "",
          });
        }
        break;

      case "confirmPassword":
        if (value.length < 8) {
          // console.log("hello");
          setError({
            ...error,
            confirmPassword: "Password should be at least 8 characters long",
          });
        } else if (userData.password !== value) {
          setError({ ...error, confirmPassword: "Passwords do not match" });
        } else {
          setError({
            ...error,
            confirmPassword: "",
          });
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    validateForm();
    event.preventDefault();

    // If all validations pass, create profile object
    const formIsValid = Object.values(error).every(
      (errorMsg) => errorMsg === ""
    );

    if (formIsValid) {
      const profile = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      };

      // Store profile object in local storage
      localStorage.setItem("profile", JSON.stringify(profile));

      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setError({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/Profile");
    }
  };

  return (
    <>
      <Typography variant="h3">Registration Form</Typography>
      <div className="first-name">
        <TextField
          error={!!error.firstName}
          helperText={error.firstName}
          id="first"
          name="firstName"
          className="field"
          label="First Name"
          variant="outlined"
          value={userData.firstName}
          onChange={handleChange}
          onBlur={(e) => handleBlur("firstName", e.target.value)}
          required
        />
      </div>
      <div className="last-name">
        <TextField
          error={!!error.lastName}
          helperText={error.lastName}
          id="last"
          name="lastName"
          className="field"
          label="Last Name"
          variant="outlined"
          value={userData.lastName}
          onChange={handleChange}
          onBlur={(e) => handleBlur("lastName", e.target.value)}
          required
        />
      </div>
      <div className="email">
        <TextField
          error={!!error.email}
          helperText={error.email}
          id="mail"
          name="email"
          className="field"
          label="Email"
          variant="outlined"
          value={userData.email}
          onChange={handleChange}
          onBlur={(e) => handleBlur("email", e.target.value)}
          required
        />
      </div>
      <div className="password">
        <TextField
          error={!!error.password}
          helperText={error.password}
          id="pass"
          name="password"
          className="field"
          label="Password"
          variant="outlined"
          type="password"
          value={userData.password}
          onChange={handleChange}
          onBlur={(e) => handleBlur("password", e.target.value)}
          required
        />
      </div>
      <div className="re-password">
        <TextField
          error={!!error.confirmPassword}
          helperText={error.confirmPassword}
          id="re-pass"
          name="confirmPassword"
          className="field"
          label="Re-enter Password"
          variant="outlined"
          type="password"
          value={userData.confirmPassword}
          onChange={handleChange}
          onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
          required
        />
      </div>
      <div className="submit">
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Form;
