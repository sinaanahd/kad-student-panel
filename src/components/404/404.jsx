import React, { useState } from "react";
import { Helmet } from "react-helmet";
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>صفحه مورد نظر شما پیدا نشد</title>
      </Helmet>
      <div className="not-found-wrapper">
        متاسفانه صفحه مورد نظر شما پیدا نشد
      </div>
    </>
  );
};

export default NotFound;
