import React, { useState } from "react";
import LittleLoading from "../reuseables/little-loading";
const WelcomeName = ({ user }) => {
  return (
    <div className="welcome-name">
      {user ? user.name : <LittleLoading />} خوش اومدی! &nbsp;&nbsp;&nbsp;👋
    </div>
  );
};

export default WelcomeName;
