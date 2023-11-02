import React, { useContext, useState } from "react";
import axios from "axios";
import LittleLoading from "../../reuseables/little-loading";
import { DataContext } from "../../data/datacontext";
const KadIntroMethod = () => {
  const { user, setUser } = useContext(DataContext);
  const [method, setMethod] = useState(false);
  const [open_box, set_open_box] = useState(false);
  const [pause, setPause] = useState(false);
  const handle_cognition_method = (text) => {
    setMethod(text);
    set_open_box(false);
  };
  const handle_open_box = () => {
    set_open_box(!open_box);
  };
  const send_data = () => {
    if (method) {
      setPause(true);
      axios
        .patch(`https://daryaftyar.ir/backend/kad_api/user/${user.user_id}`, {
          kad_cognition_method: method,
        })
        .then((res) => {
          const user = res.data;
          console.log(user);
          setUser(user);
          localStorage.setItem("kad-user", JSON.stringify(user));
          setPause(false);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      alert("یک مورد را انتخاب کنید");
    }
  };
  return (
    <section className="how-you-know-us">
      <h2 className="box-title">نحوه آشنایی</h2>
      <div className="input-result">
        <span className="result-text" onClick={handle_open_box}>
          {method ? method : user ? user.kad_cognition_method : "انتخاب کنید"}
        </span>
        {pause ? (
          <span className="submit-btn">
            <LittleLoading />
          </span>
        ) : (
          <span className="submit-btn" onClick={send_data}>
            ثبت
          </span>
        )}
      </div>
      {open_box ? (
        <div className="intro-ways-box">
          <span
            className="intro-ways-item"
            onClick={() => {
              handle_cognition_method("معرفی دوستان");
            }}
          >
            معرفی دوستان
          </span>
          <span
            className="intro-ways-item"
            onClick={() => {
              handle_cognition_method("تلگرام");
            }}
          >
            تلگرام
          </span>
          <span
            className="intro-ways-item"
            onClick={() => {
              handle_cognition_method("اینستاگرام");
            }}
          >
            اینستاگرام
          </span>
          <span
            className="intro-ways-item"
            onClick={() => {
              handle_cognition_method("تبلیغات سایت ها");
            }}
          >
            تبلیغات سایت ها
          </span>
          <span
            className="intro-ways-item"
            onClick={() => {
              handle_cognition_method("شبکه های اجتماعی داخلی");
            }}
          >
            شبکه های اجتماعی داخلی
          </span>
          <span
            className="intro-ways-item"
            onClick={() => {
              handle_cognition_method("معرفی مشاور تحصیلی");
            }}
          >
            معرفی مشاور تحصیلی
          </span>
          <span
            className="intro-ways-item"
            onClick={() => {
              handle_cognition_method("تماس پشتیبان موسسه");
            }}
          >
            تماس پشتیبان موسسه
          </span>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default KadIntroMethod;
