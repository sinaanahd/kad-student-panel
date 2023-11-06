import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import { DataContext } from "../data/datacontext";
import axios from "axios";
const Forget_pass = () => {
  useEffect(() => {
    // if (user) {
    //   window.location.pathname = "/my-courses";
    // }
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
  const [more_input, set_more_input] = useState(false);
  const [pass, setPass] = useState(false);
  const [pass_2, setPass_2] = useState(false);
  const [pass_err, setPass_err] = useState(false);
  const [pass_pause, setPassPause] = useState(false);

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
  const get_sms_code = () => {
    if (phone_number) {
      setPause(true);
      axios
        .get(
          `https://kadschool.com/backend/kad_api/verify_phone_number/${phone_number}`
        )
        .then((res) => {
          const { been_before, user_id, verification_code } = res.data;
          // console.log(res.data);
          setPause(false);
          if (been_before) {
            set_user_data(user_id);
            set_code_data(verification_code);
          } else {
            window.location.pathname = "/sign-up";
          }
        })
        .catch((e) => {
          setPause(false);
          console.log(e.message);
        });
    } else {
      set_err_phone("شماره وارد نشده یا اشتباه است");
    }

    // }
  };
  const check_sms_code = () => {
    if (sms_code === code_data && sms_code && code_data) {
      set_more_input(true);
    } else {
      set_sms_code_err("کد تائید درست نیست !");
    }
  };
  const handle_pass_1 = (value) => {
    if (value.length < 4) {
      setPass(false);
    } else {
      setPass(value);
    }
  };
  const handle_pass_2 = (value) => {
    if (value.length < 4) {
      setPass_2(false);
    } else {
      setPass_2(value);
    }
  };
  const check_pass = () => {
    if (pass && pass_2 && pass_2 === pass_2) {
      setPass_err(false);
      setPassPause(true);
      axios
        .patch(
          `https://kadschool.com/backend/kad_api/password/${phone_number}`,
          { new_password: pass }
        )
        .then((res) => {
          const { status, message } = res.data;
          // console.log(res.data);
          if (status) {
            alert(message);
            window.location.pathname = "/login";
          } else {
            alert(message);
          }
          setPassPause(false);
        })
        .catch((e) => {
          console.log(e.message);
          setPassPause(false);
        });
    } else {
      setPass_err("رمز وارد شده کوتاه است یا با یکدیگر تطابق ندارند");
    }
  };
  return (
    <>
      <Helmet>
        <title>فراموشی رمز عبور</title>
      </Helmet>
      <div className="login-page forget-pass login-code-page">
        <section className="login-part mm-width">
          <div className="login-forms">
            <h1 className="title">فراموشی رمز عبور</h1>
            <p className="login-desc">
              برای بازیابی پسورد نیاز است ابتدا شماره خود را توسط کد پیامکی
              تایید کنید سپس رمز جدید خود را بسازید
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
              {more_input ? (
                <></>
              ) : (
                <span
                  className="enter-btn"
                  onClick={() => {
                    check_sms_code();
                  }}
                >
                  تایید کد
                </span>
              )}
            </div>
            {more_input ? (
              <div className="passwords-box">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="رمز عبور"
                  onInput={({ target }) => {
                    handle_pass_1(target.value);
                  }}
                />
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="تکرار رمز عبور"
                  onInput={({ target }) => {
                    handle_pass_2(target.value);
                  }}
                />
                {pass_err ? (
                  <span className="error-login">{pass_err}</span>
                ) : (
                  <></>
                )}
                {pass_pause ? (
                  <span className="enter-btn">
                    <LittleLoading />
                  </span>
                ) : (
                  <span className="enter-btn" onClick={check_pass}>
                    تنظیم رمز جدید
                  </span>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="login-photo"></div>
        </section>
      </div>
    </>
  );
};

export default Forget_pass;
