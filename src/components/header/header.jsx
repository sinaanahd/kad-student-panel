import React, { useState } from "react";
import LittleLoading from "../reuseables/little-loading";

import avatar from "../../asset/images/header/avatar.png";
import arrow_down from "../../asset/images/header/arrow_drop_down.svg";
import notif_icon from "../../asset/images/header/bell.svg";
const Header = ({ user }) => {
  return (
    <>
      <header className="main-header">
        <div className="user-data">
          <img
            src={avatar}
            alt="نام کاربر"
            width={41}
            height={41}
            className="user-img"
          />
          <span className="user-name-wrapper">
            {user ? user.name : <LittleLoading />}
          </span>
          <img src={arrow_down} alt="باز کردن" width={24} height={25} />
        </div>
        <div className="header-icons">
          <div className="notif-wrapper">
            <img
              src={notif_icon}
              alt="اطلاعیه ها"
              width={17}
              height={25}
              className="notif-img"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
