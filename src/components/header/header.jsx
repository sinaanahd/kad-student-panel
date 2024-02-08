import React, { useState } from "react";
import LittleLoading from "../reuseables/little-loading";

import avatar from "../../asset/images/header/avatar.jpg";
import arrow_down from "../../asset/images/header/arrow_drop_down.svg";
import { CiWallet } from "react-icons/ci";
import { Link } from "react-router-dom/cjs/react-router-dom";
import convert_to_persian from "../functions/convert-to-persian";
import split_in_three from "../functions/spilit_in_three";
import scrollToTop from "../functions/scroll";
const Header = ({ user }) => {
  const [pop_up, set_pop_up] = useState(false);
  const exit_panel = () => {
    localStorage.clear();
    window.location.pathname = "/login";
  };
  const calcute_user_wallet = () => {
    let sum = 0;
    user.transactions.forEach((t) => {
      sum += t.amount;
    });
    return sum;
  };
  return (
    <>
      <header className="main-header">
        <div
          className="user-data"
          onClick={() => {
            set_pop_up(!pop_up);
          }}
        >
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
          {pop_up ? (
            <div className="user-pop-up-options">
              <span className="pop-up-option exit" onClick={exit_panel}>
                خروج از پنل
              </span>
              <Link to="/profile" className="pop-up-option">
                پروفایل
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="header-icons">
          <Link to="/wallet" className="notif-wrapper" onClick={scrollToTop}>
            <span className="amount-wrapper font-bold">
              موجودی :{" "}
              {user
                ? split_in_three(convert_to_persian(calcute_user_wallet()))
                : 0}{" "}
              تومان
            </span>
            <span className="notif-icon">
              <CiWallet />
            </span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
