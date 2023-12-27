import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import LittleLoading from "../reuseables/little-loading";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import urls from "../urls/urls";

const LoginCode = () => {
  useEffect(() => {
    if (user) {
      window.location.pathname = "/dashboard";
    }
  }, []);
  const { setUser, user } = useContext(DataContext);
  const [phone_number, setPhone_number] = useState(false);
  const [err_phone, set_err_phone] = useState(false);
  const [sms_code, set_sms_code] = useState(false);
  const [sms_code_err, set_sms_code_err] = useState(false);
  const [code_data, set_code_data] = useState(false);
  const [pause, setPause] = useState(false);
  const [user_data, set_user_data] = useState(false);
  const [get_user_pause, set_get_user_pause] = useState(false);
  const get_sms_code = () => {
    if (phone_number) {
      setPause(true);
      // `https://kadschool.com/backend/kad_api/verify_phone_number/09351589376`
      axios
        .get(`${urls.verify_number}${phone_number}`)
        .then((res) => {
          const { been_before, user_id, verification_code } = res.data;
          // console.log(res.data);
          setPause(false);
          if (been_before) {
            set_code_data(verification_code);
            set_user_data(user_id);
          } else {
            set_sms_code_err("کاربری با این شماره پیدا نشد");
            setTimeout(() => {
              window.location.pathname = "/sign-up";
            }, 2000);
          }
        })
        .catch((e) => {
          setPause(false);
          console.log(e.message);
        });
    } else {
      set_err_phone("شماره تلفن وارد نشده یا اشتباه است");
    }
  };
  const handle_phone = (value) => {
    if (value.length === 0) {
      setPhone_number(false);
      set_err_phone("شماره وارد نشده است");
    } else if (!value.startsWith("09")) {
      setPhone_number(false);
      set_err_phone("شماره باید با ۰۹ شروع شود");
    } else if (value.length !== 11) {
      setPhone_number(false);
      set_err_phone("شماره همراه باید ۱۱ رقم باشد");
    } else {
      setPhone_number(value);
      set_err_phone(false);
    }
  };
  const handle_sms_code = (value) => {
    if (value.length === 0) {
      set_sms_code(false);
      set_sms_code_err("کدی وارد نشده است");
    } else {
      set_sms_code(value);
      set_sms_code_err(false);
    }
  };
  const handle_user_login = () => {
    set_get_user_pause(true);
    if (code_data === sms_code && user_data && sms_code) {
      axios
        .get(`${urls.user}${user_data}`)
        .then((res) => {
          const user = res.data;
          setUser(user);
          localStorage.setItem("kad-user", JSON.stringify(user));
          set_get_user_pause(false);
          sessionStorage.setItem("pop-up", JSON.stringify(false));
          window.location.pathname = "/dashboard";
        })
        .catch((e) => console.log(e.message));
    } else {
      set_sms_code_err("رمز وارد شده صحیح نمی باشد");
      set_get_user_pause(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>پنل دانش آموزی کاد</title>
      </Helmet>
      <div className="login-page login-code-page">
        <section className="login-part mm-width">
          <div className="login-forms">
            <h1 className="title">پنل دانش آموزی کاد</h1>
            <p className="login-desc">
              به وب سایت کاد خوش آمدید. برای ورود شماره موبایل و کدتائید خود را
              وارد کنید
            </p>
            <div className="password-forms">
              <input
                type="number"
                name="phone-number-pass"
                id="phone-number-pass"
                placeholder="شماره موبایل"
                onInput={({ target }) => {
                  handle_phone(target.value);
                }}
              />
              {err_phone ? (
                <span className="error-login">{err_phone}</span>
              ) : (
                <></>
              )}
              <div className="get-code-wrapper">
                {pause ? (
                  <span className="get-sms-code">
                    <LittleLoading />
                  </span>
                ) : (
                  <span className="get-sms-code" onClick={get_sms_code}>
                    دریافت کد پیامکی
                  </span>
                )}
                {/* <span className="get-sms-code" onClick={get_sms_code}>
                  دریافت کد پیامکی
                </span> */}
                {code_data ? (
                  <input
                    type="number"
                    className="verification-code"
                    placeholder="وارد کردن کد تائید"
                    onInput={({ target }) => {
                      handle_sms_code(target.value);
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            {sms_code_err ? (
              <span className="error-login">{sms_code_err}</span>
            ) : (
              <></>
            )}
            {get_user_pause ? (
              <span className="enter-btn">
                <LittleLoading />
              </span>
            ) : (
              <span className="enter-btn" onClick={handle_user_login}>
                ورود
              </span>
            )}

            <div className="not-user">
              <p className="not-user-text">حساب کاربری نداری ؟</p>
              <Link to="/sign-up" className="go-to-sign-up">
                ثبت‌نام
              </Link>
            </div>
            <div className="enter-btns">
              <Link to="/login" className="enter-with-sms">
                ورود از طریق رمز عبور
              </Link>
            </div>
          </div>
          <div className="login-photo"></div>
        </section>
      </div>
    </>
  );
};

export default LoginCode;
