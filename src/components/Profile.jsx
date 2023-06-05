import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const storedProfile = localStorage.getItem("profile");
  const profile = storedProfile ? JSON.parse(storedProfile) : null;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <Typography variant="h3">Profile</Typography>
      {profile ? (
        <>
          <div>
            <Typography variant="body1">
              First Name: {profile.firstName}
            </Typography>
            <Typography variant="body1">
              Last Name: {profile.lastName}
            </Typography>
            <Typography variant="body1">Email: {profile.email}</Typography>
          </div>
          <div className="back">
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Back
            </Button>
          </div>
        </>
      ) : (
        <Typography variant="body1">No profile data available</Typography>
      )}
    </div>
  );
};

export default Profile;
