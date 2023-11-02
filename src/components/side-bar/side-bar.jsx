import React, { useState } from "react";
import side_bar_img_1 from "../../asset/images/side-bar/dashboard.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
const SideBar = () => {
  return (
    <aside className="side-bar-wrapper">
      <ul className="side-bar-items">
        <li className="side-bar-item active">
          <Link to="/my-courses" className="link-side-bar">
            <img
              width={24}
              height={24}
              src={side_bar_img_1}
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">درس های من</span>
          </Link>
        </li>
        <li className="side-bar-item">
          <Link className="link-side-bar" to="/profile">
            <img
              width={24}
              height={24}
              src={side_bar_img_1}
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">اطلاعات کاربری</span>
          </Link>
        </li>
        <li className="side-bar-item">
          <Link className="link-side-bar" to="/finance">
            <img
              width={24}
              height={24}
              src={side_bar_img_1}
              alt="اسم آیتم"
              className="side-bar-img"
            />
            <span className="side-text">امور مالی</span>
          </Link>
        </li>
        <li className="side-bar-item">
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
        <li className="side-bar-item">
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
        <li className="side-bar-item">
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
        <li className="side-bar-item">
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
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
