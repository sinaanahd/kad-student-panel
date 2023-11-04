import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import copy_icon from "../../../asset/images/my-courses/copy-icon.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";
import copy_to_clip_board from "../../functions/copy-to-clip-board";
const SpotData = () => {
  const { user } = useContext(DataContext);
  const [copied, setCopied] = useState(false);
  return (
    <section className="spot-datas-wrapper">
      <div className="box-header">
        <h2 className="box-title">دسترسی های لازم</h2>
        {copied ? <span className="spot-copied">کپی شد!</span> : <></>}
      </div>
      <div className="spot-datas">
        <span className="spot-data">
          <span className="spot-item-title">نام کاربری</span>
          <span className="data-box-wrapper">
            <span className="code-place">
              {user ? user.skyRoom_username : <LittleLoading />}
            </span>
            <span
              className="copy-items"
              onClick={() => {
                setCopied(true);
                copy_to_clip_board(user ? user.skyRoom_username : "");
                setTimeout(() => {
                  setCopied(false);
                }, 1000);
              }}
            >
              <img src={copy_icon} alt="کپی کرددن" className="copy-icon" />
              <span className="copy-text">کپی!</span>
            </span>
          </span>
        </span>
        <span className="spot-data">
          <span className="spot-item-title">رمز عبور</span>
          <span className="data-box-wrapper">
            <span className="code-place">
              {user ? user.skyRoom_password : <LittleLoading />}
            </span>
            <span
              className="copy-items"
              onClick={() => {
                setCopied(true);
                copy_to_clip_board(user ? user.skyRoom_password : "");
                setTimeout(() => {
                  setCopied(false);
                }, 1000);
              }}
            >
              <img src={copy_icon} alt="کپی کرددن" className="copy-icon" />
              <span className="copy-text">کپی!</span>
            </span>
          </span>
        </span>
        <span className="spot-data">
          <span className="spot-item-title">لایسنس</span>
          <span className="data-box-wrapper">
            <span className="code-place">
              {user ? user.spot_license : <LittleLoading />}
            </span>
            <span
              className="copy-items"
              onClick={() => {
                setCopied(true);
                copy_to_clip_board(user ? user.spot_license : "");
                setTimeout(() => {
                  setCopied(false);
                }, 1000);
              }}
            >
              <img src={copy_icon} alt="کپی کرددن" className="copy-icon" />
              <span className="copy-text">کپی!</span>
            </span>
          </span>
        </span>
      </div>
      <Link to="#" className="tutuorials-btn">
        آموزش ها
      </Link>
    </section>
  );
};

export default SpotData;
