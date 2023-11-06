import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import profile_icon from "../../asset/images/side-bar/profile-icon.svg";
import profile_icon_active from "../../asset/images/side-bar/profile-icon-active.svg";
import my_courses_icon from "../../asset/images/side-bar/dashboard-icon.svg";
import my_courses_icon_active from "../../asset/images/side-bar/dashboard-icon-active.svg";
import finance_icon from "../../asset/images/side-bar/finance-icon.svg";
import finance_icon_active from "../../asset/images/side-bar/finance-icon-active.svg";
const SideBar = () => {
  const [page_decider, set_page_decider] = useState(false);
  useEffect(() => {
    setInterval(() => {
      check_page();
    }, 1000);
  }, []);
  const check_page = () => {
    set_page_decider(window.location.pathname.split("/")[1]);
  };
  return (
    <aside className="side-bar-wrapper">
      <ul className="side-bar-items">
        <li
          onClick={check_page}
          className={
            page_decider === "my-courses"
              ? "side-bar-item active"
              : "side-bar-item"
          }
        >
          <Link to="/my-courses" className="link-side-bar">
            <img
              width={24}
              height={24}
              src={
                page_decider === "my-courses"
                  ? my_courses_icon_active
                  : my_courses_icon
              }
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">درس های من</span>
          </Link>
        </li>
        <li
          onClick={check_page}
          className={
            page_decider === "profile"
              ? "side-bar-item active"
              : "side-bar-item"
          }
        >
          <Link className="link-side-bar" to="/profile">
            <img
              width={24}
              height={24}
              src={
                page_decider === "profile" ? profile_icon_active : profile_icon
              }
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">اطلاعات کاربری</span>
          </Link>
        </li>
        <li
          onClick={check_page}
          className={
            page_decider === "finance"
              ? "side-bar-item active"
              : "side-bar-item"
          }
        >
          <Link className="link-side-bar" to="/finance">
            <img
              width={24}
              height={24}
              src={
                page_decider === "finance" ? finance_icon_active : finance_icon
              }
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">امور مالی</span>
          </Link>
        </li>
        {/*<li
          onClick={check_page}
          className={
            page_decider === "" ? "side-bar-item active" : "side-bar-item"
          }
        >
          <Link className="link-side-bar" to="/my-courses">
            <img
              width={24}
              height={24}
              src={side_bar_img_1}
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">میزکار</span>
          </Link>
        </li>
        <li
          onClick={check_page}
          className={
            page_decider === "" ? "side-bar-item active" : "side-bar-item"
          }
        >
          <Link className="link-side-bar" to="/my-courses">
            <img
              width={24}
              height={24}
              src={side_bar_img_1}
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">آموزش</span>
          </Link>
        </li>
        <li
          onClick={check_page}
          className={
            page_decider === "" ? "side-bar-item active" : "side-bar-item"
          }
        >
          <Link className="link-side-bar" to="/my-courses">
            <img
              width={24}
              height={24}
              src={side_bar_img_1}
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">خرید درس</span>
          </Link>
        </li>
        <li
          onClick={check_page}
          className={
            page_decider === "" ? "side-bar-item active" : "side-bar-item"
          }
        >
          <Link className="link-side-bar" to="/my-courses">
            <img
              width={24}
              height={24}
              src={side_bar_img_1}
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">سبد خرید</span>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
};

export default SideBar;
