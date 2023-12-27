import React, { useState } from "react";
import { useEffect } from "react";
// import { BsLightningFill } from "react-icons/bs";
import { PiGiftDuotone } from "react-icons/pi";
// import pop_img from "../../../asset/images/sina.jpeg";
const FixedPopUp = () => {
  const [active, set_active] = useState(false);
  let count = 0;
  useEffect(() => {
    if (count === 0) {
      setInterval(() => {
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/login-code" &&
          window.location.pathname !== "/sign-up" &&
          window.location.pathname !== "/forget-pass"
        ) {
          const open_need = JSON.parse(sessionStorage.getItem("pop-up"));
          if (!open_need) {
            setTimeout(() => {
              change_activation();
              sessionStorage.setItem("pop-up", JSON.stringify(true));
            }, 1000);
          }
        }
      }, 1000);
    }
  }, []);
  const change_activation = () => {
    set_active(true);
  };
  return (
    <div className="fixed-pop-up-wrapper">
      <div
        className="pop-up-icon"
        onClick={() => {
          set_active(true);
        }}
      >
        <PiGiftDuotone />
      </div>
      {active ? (
        <div className="pop-image-show-container">
          <div className="pop-up-img-wrapper mm-width">
            <img
              src="https://kadschool.com/media/Banners/banner_id_54.webp"
              loading="lazy"
              //   src={pop_img}
              alt="نکته و تست"
            />
            <div className="pop-up-btns">
              <button
                className="close-btn pop-up-btn"
                onClick={() => {
                  set_active(false);
                }}
              >
                بستن
              </button>
              <a href="#" className="visit-btn pop-up-btn">
                مشاهده
              </a>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FixedPopUp;
