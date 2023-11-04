import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import LittleLoading from "../reuseables/little-loading";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import arrow from "../../asset/images/login/arrow-vector.svg";

const SignUp = () => {
  useEffect(() => {
    if (user) {
      window.location.pathname = "/my-courses";
    }
  }, []);
  const { setUser, subjects, years, user } = useContext(DataContext);
  const [phone_number, setPhone_number] = useState(false);
  const [err_phone, set_err_phone] = useState(false);
  const [pause, setPause] = useState(false);
  const [user_data, set_user_data] = useState(false);
  const [been_before, set_been_before] = useState(false);
  const [code_data, set_code_data] = useState(false);
  const [sms_code, set_sms_code] = useState(false);
  const [sms_code_err, set_sms_code_err] = useState(false);
  const [more_input, set_more_input] = useState(false);
  const [select_box, set_select_box] = useState(false);
  const [name, set_name] = useState(false);
  const [name_err, set_name_err] = useState(false);
  const [subject, set_subject] = useState(false);
  const [subject_err, set_subject_err] = useState(false);
  const [grade, set_grade] = useState(false);
  const [grade_err, set_grade_err] = useState(false);
  const [sign_up_pause, set_sign_up_pause] = useState(false);
  const check_sms_code = () => {
    if (sms_code === code_data && sms_code && code_data) {
      if (been_before) {
        axios
          .get(` https://daryaftyar.ir/backend/kad_api/user/${user_data}`)
          .then((res) => {
            const user = res.data;
            setUser(user);
            localStorage.setItem("kad-user", JSON.stringify(user));
            window.location.pathname = "/my-courses";
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        set_more_input(true);
      }
    } else {
      set_sms_code_err("کد تائید درست نیست !");
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
  const get_sms_code = () => {
    if (phone_number) {
      setPause(true);
      axios
        .get(
          `https://kadschool.com/backend/kad_api/verify_phone_number/${phone_number}`
        )
        .then((res) => {
          const { been_before, user_id, verification_code } = res.data;
          console.log(res.data);
          setPause(false);
          if (been_before) {
            set_user_data(user_id);
            set_been_before(been_before);
          }
          set_code_data(verification_code);
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
  const handle_sms_code = (value) => {
    if (value.length === 0) {
      set_sms_code(false);
      set_sms_code_err("کدی وارد نشده است");
    } else {
      set_sms_code(value);
      set_sms_code_err(false);
    }
  };
  const handle_select_box = (mode) => {
    if (mode === select_box) {
      set_select_box(false);
    } else {
      set_select_box(mode);
    }
  };
  const handle_name = (value) => {
    if (value.length < 3) {
      set_name(false);
      set_name_err("نام وارد شده کوتاه است");
    } else {
      set_name(value);
      set_name_err(false);
    }
  };
  const handle_subject = (s) => {
    set_subject(s);
    handle_select_box(false);
  };
  const handle_grade = (g) => {
    set_grade(g);
    handle_select_box(false);
  };
  const handle_sign_up = () => {
    if (name && subject && grade && phone_number) {
      const send_obj = {
        phone_number: phone_number,
        name: name,
        grade: grade.name,
        major: subject.name,
      };
      set_sign_up_pause(true);
      axios
        .post(`https://kadschool.com/backend/kad_api/register_user`, send_obj)
        .then((res) => {
          let data = res.data;
          axios
            .get(`https://kadschool.com/backend/kad_api/user/${data.user_id}`)
            .then((res) => {
              const user = res.data;
              setUser(user);
              localStorage.setItem("kad-user", JSON.stringify(user));
              window.location.pathname = "/my-courses";
              set_sign_up_pause(false);
            })
            .catch((err) => this.props.handle_error(err));
        })
        .catch((err) => this.props.handle_error(err));
    } else {
      if (!name) {
        set_name_err("نام وارد نشده یا مشکل دارد");
      }
      if (!subject) {
        set_subject_err("رشته تحصیلی انتخاب نشده است");
      }
      if (!grade) {
        set_grade_err("پایه تحصیلی انتخاب نشده است");
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>ثبت‌نام در کاد</title>
      </Helmet>
      <div className="login-page login-code-page singup-page">
        <section className="login-part mm-width">
          <div className="login-forms">
            <h1 className="title">ثبت نام در کاد</h1>
            <p className="login-desc">
              به وب سایت کاد خوش آمدید. برای ثبت نام کافی است اطلاعات زیر را
              تکمیل کنید
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

            <div className="not-user">
              <p className="not-user-text">حساب کاربری داری ؟</p>
              <Link to="/login" className="go-to-sign-up">
                ورود
              </Link>
            </div>
          </div>

          {more_input ? (
            <div className="login-photo not-photo-needed">
              <span className="input-wrapper">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  onInput={({ target }) => {
                    handle_name(target.value);
                  }}
                />
              </span>
              {name_err ? (
                <span className="error-login">{name_err}</span>
              ) : (
                <></>
              )}
              <span className="input-wrapper">
                <span
                  className="need-border"
                  onClick={() => {
                    handle_select_box("year");
                  }}
                >
                  <span className="input-text">
                    {grade ? grade.name : "پایه تحصیلی"}
                  </span>
                  <img src={arrow} alt="باز/بسته" />
                </span>
                {select_box === "year" ? (
                  <span className="select-options">
                    {years ? (
                      years.map((y) => (
                        <span
                          key={y.id}
                          className="select-option"
                          onClick={() => {
                            handle_grade(y);
                          }}
                        >
                          {y.name}
                        </span>
                      ))
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                ) : (
                  <></>
                )}
              </span>
              {grade_err ? (
                <span className="error-login">{grade_err}</span>
              ) : (
                <></>
              )}
              <span className="input-wrapper">
                <span
                  className="need-border"
                  onClick={() => {
                    handle_select_box("subject");
                  }}
                >
                  <span className="input-text">
                    {subject ? subject.name : "رشته تحصیلی"}
                  </span>
                  <img src={arrow} alt="باز/بسته" />
                </span>
                {select_box === "subject" ? (
                  <span className="select-options">
                    {subjects ? (
                      subjects.map((s) => (
                        <span
                          key={s.id}
                          className="select-option"
                          onClick={() => {
                            handle_subject(s);
                          }}
                        >
                          {s.name}
                        </span>
                      ))
                    ) : (
                      <LittleLoading />
                    )}
                  </span>
                ) : (
                  <></>
                )}
              </span>
              {subject_err ? (
                <span className="error-login">{subject_err}</span>
              ) : (
                <></>
              )}
              {sign_up_pause ? (
                <span className="enter-btn">
                  <LittleLoading />
                </span>
              ) : (
                <span
                  className="enter-btn"
                  onClick={() => {
                    handle_sign_up();
                  }}
                >
                  ثبت نام
                </span>
              )}
              {/* <span
                className="enter-btn"
                onClick={() => {
                  handle_sign_up();
                }}
              >
                ثبت نام
              </span> */}
            </div>
          ) : (
            <div className="login-photo"></div>
          )}
          {/* <div className="login-photo not-photo-needed">
            <span className="input-wrapper">
              <input type="text" placeholder="نام و نام خانوادگی" />
            </span>
            <span className="input-wrapper need-border">
              <span className="input-text">پایه تحصیلی</span>
              <img src={arrow} alt="باز/بسته" />
              <span className="select-options">
                {years ? (
                  years.map((y) => (
                    <span key={y.id} className="select-option">
                      {y.name}
                    </span>
                  ))
                ) : (
                  <LittleLoading />
                )}
              </span>
            </span>
            <span className="input-wrapper need-border">
              <span className="input-text">رشته تحصیلی</span>
              <img src={arrow} alt="باز/بسته" />
              <span className="select-options">
                {subjects ? (
                  subjects.map((s) => (
                    <span key={s.id} className="select-option">
                      {s.name}
                    </span>
                  ))
                ) : (
                  <LittleLoading />
                )}
              </span>
            </span>
            <span className="enter-btn">ثبت نام</span>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default SignUp;
