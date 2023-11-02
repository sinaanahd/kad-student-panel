import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scroll_to_top from "../../functions/scroll";
const User_kelas = ({ kelas }) => {
  return (
    <div className="class-wrapper">
      <span className="main-class-name">{kelas.kelas_title}</span>
      <span className="main-class-teacher">
        {"استاد " + kelas.kelas_title_and_ostad_name.split("استاد")[1]}
      </span>
      <span className="session-data">
        <span className="session-name">اسم این جلسه</span>
        <span className="session-date-data">
          <span className="week-day">چهارشنبه</span>
          <span className="week-time">۱۰-۱۲</span>
        </span>
      </span>
      <span className="enter-to-class-btn">ورود به کلاس</span>
      <Link
        to={`/jalasat`}
        onClick={scroll_to_top}
        className="enter-to-class-btn see-session"
      >
        دیدن جلسات این کلاس
      </Link>
    </div>
  );
};

export default User_kelas;
