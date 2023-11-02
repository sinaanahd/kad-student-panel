import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";

import Password from "./password/password";
import ProfileData from "./profile-data/profile-data";
import KadIntroMethod from "./kad-intro-method/kad-intro-method";
const ProfilePage = () => {
  const { user } = useContext(DataContext);
  return (
    <>
      <Helmet>
        <title>اطلاعات کاربری</title>
      </Helmet>
      <div className="profile-page">
        <div className="how-introduced-and-set-password">
          <KadIntroMethod />
          <Password />
        </div>
        <ProfileData />
      </div>
    </>
  );
};

export default ProfilePage;
