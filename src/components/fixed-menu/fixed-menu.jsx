import React, { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { CiGift } from "react-icons/ci";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import convert_to_persian from "../functions/convert-to-persian";
import scrollToTop from "../functions/scroll";
import copy_to_clip_board from "../functions/copy-to-clip-board";
const FixedMenu = () => {
  const [show_options, set_options] = useState(false);
  const [show_gift, set_show_gift] = useState(false);
  const [animate, set_animate] = useState("animate");
  const [copy, set_copy] = useState(false);
  useEffect(() => {
    setInterval(() => {
      if (
        window.location.pathname !== "/Login" &&
        window.location.pathname !== "/LoginPass" &&
        window.location.pathname !== "/Forget-password" &&
        window.location.pathname !== "/SignUp"
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
  }, []);
  const change_activation = () => {
    set_show_gift(true);
  };
  const handle_deactivation = (e) => {
    set_options(false);
    set_show_gift(false);
    scrollToTop();
  };
  return (
    <div className="fixed-left-menu-wrapper">
      <button
        className="open-menu-icon"
        onClick={() => {
          set_options(!show_options);
        }}
      >
        <TiThMenu />
      </button>
      {show_options ? (
        <>
          <Link
            to="/Cart"
            onClick={handle_deactivation}
            className={"link-to-special-place cart-link "}
          >
            <CiShoppingCart />
            <span className="fixed-left-menu-wrapper-label font-bold">
              سبد خرید
            </span>
          </Link>
          <Link
            to="/wallet"
            onClick={handle_deactivation}
            className={"link-to-special-place wallet-link "}
          >
            <CiWallet />
            <span className="fixed-left-menu-wrapper-label font-bold">
              کیف پول
            </span>
          </Link>
          <button
            className={"link-to-special-place gift-link "}
            onClick={() => {
              set_show_gift(true);
              set_options(false);
            }}
          >
            <CiGift />
            <span className="fixed-left-menu-wrapper-label font-bold">
              جایزه !
            </span>
          </button>
        </>
      ) : (
        <></>
      )}
      {show_gift ? (
        <div className="pop-image-show-container">
          <div className="pop-up-img-wrapper mm-width">
            <p className="desc-text font-bold">
              آخرین تخفیف سال ۱۴۰۲ کاد منتظر شماست !
              <br />
              <font className="color-red-notice">۳۵ درصد</font>
              به مناسبت پیشواز سال نو بر روی تمامی محصولات قرار گرفت. شما می
              توانید برای درخواست همراهی بیشتر به شماره زیر نام و نام خانوادگی
              خود را پیامک کنید
            </p>
            <span className="btn-wrappers">
              <span
                className="call-us-now-btn"
                onClick={() => {
                  copy_to_clip_board("09128965613");
                  set_copy(true);
                  setTimeout(() => {
                    set_copy(false);
                  }, 1000);
                }}
              >
                {"۰" + convert_to_persian(9128965613)}
              </span>
              <span
                className="copy font-bold"
                onClick={() => {
                  copy_to_clip_board("09128965613");
                  set_copy(true);
                  setTimeout(() => {
                    set_copy(false);
                  }, 1000);
                }}
              >
                {!copy ? "کپی" : "کپی شد"}
              </span>
            </span>
            <p className="desc-text font-bold">
              همچنین می توانید با استفاده از کیف پول خود از جایزه ۱۰۰ هزار
              تومانی ثبت نام یا همراهی استفاده کنید. کلی جایزه و تخفیف دیگه هم
              توی صفحه کیف پول منتظرته.
            </p>
            <a
              className="go-to-wallet-notice-btn font-bold"
              href="https://kadschool.com/wallet"
              target="_blank"
              onClick={() => {
                scrollToTop();
                handle_deactivation();
              }}
            >
              صفحه کیف پول
            </a>
            <div className="pop-up-btns">
              <button
                className="close-btn pop-up-btn"
                onClick={() => {
                  set_show_gift(false);
                }}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FixedMenu;
