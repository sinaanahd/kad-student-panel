import React, { useContext, useState } from "react";
import LittleLoading from "../../reuseables/little-loading";
import arrow from "../../../asset/images/profile/arrow-vector.svg";
import { DataContext } from "../../data/datacontext";
import make_full_objects from "../../functions/make-full-objects";
import axios from "axios";
import urls from "../../urls/urls";
const ProfileData = () => {
  const { user, setUser, years, subjects, ref_subjects, ref_years } =
    useContext(DataContext);
  const [name, set_name] = useState(false);
  const [name_err, set_name_err] = useState(false);
  const [address, set_address] = useState(false);
  const [address_err, set_address_err] = useState(false);
  const [home_number, set_home_number] = useState(false);
  const [home_number_err, set_home_number_err] = useState(false);
  const [subject, set_subject] = useState(false);
  const [subject_err, set_subject_err] = useState(false);
  const [grade, set_grade] = useState(false);
  const [grade_err, set_grade_err] = useState(false);
  const [day, set_day] = useState(false);
  const [month, set_month] = useState(false);
  const [year, set_year] = useState(false);
  const [day_err, set_day_err] = useState(false);
  const [month_err, set_month_err] = useState(false);
  const [year_err, set_year_err] = useState(false);
  const [subject_pop_up, set_subject_pop_up] = useState(false);
  const [grade_pop_up, set_grade_pop_up] = useState(false);
  const [pause, setPause] = useState(false);

  const handle_name = (value) => {
    if (value.length < 3) {
      set_name(false);
      set_name_err("نام وارد شده کوتاه است");
    } else {
      set_name(value);
      set_name_err(false);
    }
  };
  const handle_address = (value) => {
    if (value.length < 3) {
      set_address(false);
      set_address_err("ادرس وارد شده کوتاه است");
    } else {
      set_address(value);
      set_address_err(false);
    }
  };
  const handle_home_number = (value) => {
    if (!value.startsWith("0")) {
      set_home_number(false);
      set_home_number_err("کد شهر باید با صفر شروع شود");
    } else if (value.length !== 11) {
      set_home_number(false);
      set_home_number_err("شماره تلفن باید ۱۱ رقم باشد");
    } else {
      set_home_number(value);
      set_home_number_err(false);
    }
  };
  const handle_day = (e) => {
    if (e.target.value.length > 2) {
      set_day(e.target.value[0] + e.target.value[1]);
      e.target.value = e.target.value[0] + e.target.value[1];
    } else if (e.target.value.length === 0) {
      set_day(false);
      set_day_err("روز تولد وارد نشده است");
    } else if (parseInt(e.target.value) > 31) {
      set_day(false);
      e.target.value = null;
    } else {
      set_day(e.target.value);
      set_day_err(false);
    }
  };
  const handle_month = (e) => {
    if (e.target.value.length > 2) {
      set_month(e.target.value[0] + e.target.value[1]);
      e.target.value = e.target.value[0] + e.target.value[1];
    } else if (e.target.value.length === 0) {
      set_month(false);
      set_month_err("ماه تولد وارد نشده است");
    } else if (parseInt(e.target.value) > 12) {
      set_month(false);
      e.target.value = null;
    } else {
      set_month(e.target.value);
      set_month_err(false);
    }
  };
  const handle_year = (e) => {
    if (e.target.value.length > 4) {
      set_month(e.target.value[0] + e.target.value[1]);
      e.target.value =
        e.target.value[0] +
        e.target.value[1] +
        e.target.value[2] +
        e.target.value[3];
    } else if (e.target.value.length === 0) {
      set_year(false);
      set_year_err("سال تولد وارد نشده است");
    } else if (parseInt(e.target.value) > 1402) {
      set_year(false);
      e.target.value = null;
    } else {
      set_year(e.target.value);
      set_year_err(false);
    }
  };
  const handle_subject = (s) => {
    set_subject(s);
    set_subject_pop_up(false);
  };
  const handle_grade = (g) => {
    set_grade(g);
    set_grade_pop_up(false);
  };
  const send_data = () => {
    const obj_arr = [
      { title: "name", value: name },
      { title: "birth_day", value: day },
      { title: "birth_month", value: month },
      { title: "birth_year", value: year },
      { title: "home_address", value: address },
      { title: "home_phone_number", value: home_number },
      { title: "major", value: subject },
      { title: "year", value: grade },
    ];
    const send_obj = make_full_objects(obj_arr);
    if (Object.keys(send_obj).length !== 0) {
      setPause(true);
      axios
        .patch(`${urls.user}${user.user_id}`, send_obj)
        .then((res) => {
          const user = res.data;
          console.log(user);
          setUser(user);
          localStorage.setItem("kad-user", JSON.stringify(user));
          setPause(false);
          alert("اطلاعات با موفقیت ویرایش شد");
          window.location.reload();
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  return (
    <section className="profile-data">
      <div className="box-header">
        <h2 className="box-title">اطلاعات کاربری</h2>
      </div>
      {name_err ||
      address_err ||
      home_number_err ||
      subject_err ||
      grade_err ||
      day_err ||
      month_err ||
      year_err ? (
        <div className="info-err-box">
          {name_err ? <span className="info-err">{name_err}</span> : <></>}
          {address_err ? (
            <span className="info-err">{address_err}</span>
          ) : (
            <></>
          )}
          {home_number_err ? (
            <span className="info-err">{home_number_err}</span>
          ) : (
            <></>
          )}
          {subject_err ? (
            <span className="info-err">{subject_err}</span>
          ) : (
            <></>
          )}
          {grade_err ? <span className="info-err">{grade_err}</span> : <></>}
          {day_err ? <span className="info-err">{day_err}</span> : <></>}
          {month_err ? <span className="info-err">{month_err}</span> : <></>}
          {year_err ? <span className="info-err">{year_err}</span> : <></>}
        </div>
      ) : (
        <></>
      )}
      <div className="forms-wrapper">
        <span className="input-wrapper">
          <span className="input-title">نام و نام خانوادگی</span>
          <input
            type="text"
            className="entry-type"
            placeholder={user ? user.name : "نام خود را وارد کنید"}
            onInput={({ target }) => {
              handle_name(target.value);
            }}
          />
        </span>
        <span className="input-wrapper">
          <span className="input-title">شماره همراه</span>
          <span className="input-box">
            {user ? user.phone_number : <LittleLoading />}
          </span>
        </span>
        <span className="input-wrapper">
          <span className="input-title">آدرس منزل</span>
          <textarea
            onInput={({ target }) => {
              handle_address(target.value);
            }}
            name=""
            id=""
            className="text-area-input"
            placeholder={user ? user.home_address : "آدرس خود را وارد کنید"}
          ></textarea>
        </span>
        <span className="input-wrapper">
          <span className="input-title">شماره ثابت</span>
          <input
            onInput={({ target }) => {
              handle_home_number(target.value);
            }}
            type="number"
            className="entry-type"
            placeholder={
              user ? user.home_phone_number : "شماره منزل خود را وارد کنید"
            }
          />
        </span>
        <span className="input-wrapper">
          <span className="input-title">رشته تحصیلی</span>
          <span
            className="input-select"
            onClick={() => {
              set_subject_pop_up(!subject_pop_up);
              set_grade_pop_up(false);
            }}
          >
            <span className="select-index">
              {subject
                ? subject
                : user
                ? ref_subjects.find((s) => s.id === user.subject).name
                : "انتخاب رشته"}
            </span>
            <img src={arrow} alt="باز / بسته" />
          </span>
          {subject_pop_up ? (
            <span className="info-option-box">
              {subjects.map((s) => (
                <span
                  key={s.id}
                  className="info-option"
                  onClick={() => {
                    handle_subject(s.name);
                  }}
                >
                  {s.name}
                </span>
              ))}
            </span>
          ) : (
            <></>
          )}
        </span>
        <span className="input-wrapper">
          <span className="input-title">پایه تحصیلی</span>
          <span
            className="input-select"
            onClick={() => {
              set_grade_pop_up(!grade_pop_up);
              set_subject_pop_up(false);
            }}
          >
            <span className="select-index">
              {grade
                ? grade
                : user
                ? ref_years.find((s) => s.id === user.year).name
                : "انتخاب پایه"}
            </span>
            <img src={arrow} alt="باز / بسته" />
          </span>
          {grade_pop_up ? (
            <span className="info-option-box">
              {years.map((y) => (
                <span
                  key={y.id}
                  className="info-option"
                  onClick={() => {
                    handle_grade(y.name);
                  }}
                >
                  {y.name}
                </span>
              ))}
            </span>
          ) : (
            <></>
          )}
        </span>
        <span className="input-wrapper">
          <span className="input-title">تاریخ تولد</span>
          <span className="birth-day-inputs">
            <input
              type="number"
              placeholder={
                user
                  ? user.birth_day
                    ? `روز : ${user.birth_day}`
                    : "روز"
                  : "روز"
              }
              className="day-input"
              onInput={(e) => {
                handle_day(e);
              }}
              maxLength="2"
            />
            <input
              type="number"
              placeholder={
                user
                  ? user.birth_month
                    ? `ماه : ${user.birth_month}`
                    : "ماه"
                  : "ماه"
              }
              className="month-input"
              maxLength="2"
              onInput={(e) => {
                handle_month(e);
              }}
            />
            <input
              type="number"
              placeholder={
                user
                  ? user.birth_year
                    ? `سال : ${user.birth_year}`
                    : "سال"
                  : "سال"
              }
              onInput={(e) => {
                handle_year(e);
              }}
              className="year-input"
              maxLength="4"
            />
          </span>
        </span>
      </div>
      {pause ? (
        <span className="inputs-submit-btn">
          <LittleLoading />
        </span>
      ) : (
        <span className="inputs-submit-btn" onClick={send_data}>
          ثبت
        </span>
      )}
      {name_err ||
      address_err ||
      home_number_err ||
      subject_err ||
      grade_err ||
      day_err ||
      month_err ||
      year_err ? (
        <div className="info-err-box responsive">
          {name_err ? <span className="info-err">{name_err}</span> : <></>}
          {address_err ? (
            <span className="info-err">{address_err}</span>
          ) : (
            <></>
          )}
          {home_number_err ? (
            <span className="info-err">{home_number_err}</span>
          ) : (
            <></>
          )}
          {subject_err ? (
            <span className="info-err">{subject_err}</span>
          ) : (
            <></>
          )}
          {grade_err ? <span className="info-err">{grade_err}</span> : <></>}
          {day_err ? <span className="info-err">{day_err}</span> : <></>}
          {month_err ? <span className="info-err">{month_err}</span> : <></>}
          {year_err ? <span className="info-err">{year_err}</span> : <></>}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ProfileData;
