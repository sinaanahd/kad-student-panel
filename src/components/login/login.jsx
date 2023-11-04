import React, { useContext, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import LittleLoading from "../reuseables/little-loading";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";

const Login = () => {
  const { setUser } = useContext(DataContext);
  const [phone_number, setPhone_number] = useState(false);
  const [err_phone, set_err_phone] = useState(false);
  const [pass, setPass] = useState(false);
  const [pass_err, setPass_err] = useState(false);
  const [pause, setPause] = useState(false);
  const handle_user_login = () => {
    if (pass && phone_number) {
      setPause(true);
      axios
        .get(`https://daryaftyar.ir/backend/kad_api/password/${phone_number}`)
        .then((res) => {
          const { exists, password, user_id } = res.data;
          if (exists) {
            if (password === pass) {
              axios
                .get(` https://daryaftyar.ir/backend/kad_api/user/${user_id}`)
                .then((res) => {
                  const user = res.data;
                  setUser(user);
                  localStorage.setItem("kad-user", JSON.stringify(user));
                  setPause(false);
                  window.location.pathname = "/my-courses";
                })
                .catch((err) => {
                  console.log(err.message);
                });
            } else {
              const pass_err = "پسورد وارد شده صحیح نمی باشد";
              setPass_err(pass_err);
            }
          } else {
            set_err_phone("شماره تلفن وارد شده اشتباه است");
          }
        })
        .catch((e) => {
          setPause(false);
          console.log(e.message);
        });
    } else {
      if (!pass) {
        setPass_err("پسورد وارد نشده است");
      }
      if (!phone_number) {
        set_err_phone("شماره وارد نشده است یا صحیح نیست");
      }
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
  const handle_pass = (value) => {
    if (value.length === 0) {
      setPass_err("رمزی وارد نشده است");
      setPass(false);
    } else {
      setPass(value);
      setPass_err(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>پنل دانش آموزی کاد</title>
      </Helmet>
      <div className="login-page">
        <section className="login-part mm-width">
          <div className="login-forms">
            <h1 className="title">پنل دانش آموزی کاد</h1>
            <p className="login-desc">
              به وب سایت کاد خوش آمدید. برای ورود شماره موبایل و رمز خود را وارد
              کنید
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
              <input
                type="password"
                name="phone-number-pass"
                id="phone-number-pass"
                placeholder="رمز عبور"
                onInput={({ target }) => {
                  handle_pass(target.value);
                }}
              />
              {pass_err ? (
                <span className="error-login">{pass_err}</span>
              ) : (
                <></>
              )}
            </div>
            <Link to="#" className="forget-link">
              فراموشی رمز عبور
            </Link>
            {pause ? (
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
              <Link to="#" className="go-to-sign-up">
                ثبت‌نام
              </Link>
            </div>
            <div className="enter-btns">
              <Link to="#" className="enter-with-sms">
                ورود از طریق کد پیامکی
              </Link>
            </div>
          </div>
          <div className="login-photo"></div>
        </section>
      </div>
    </>
  );
};

export default Login;
