import React, { useState, useRef, useContext } from "react";
import LittleLoading from "../../reuseables/little-loading";
import axios from "axios";
import { DataContext } from "../../data/datacontext";
import urls from "../../urls/urls";
const Password = () => {
  const { user } = useContext(DataContext);
  const [pause, setPause] = useState(false);
  const [pass1, setPass1] = useState(false);
  const [pass1_err, setPass1_err] = useState(false);
  const [pass2, setPass2] = useState(false);
  const [pass2_err, setPass2_err] = useState(false);
  const [fail_pass, setFail_pass] = useState(false);

  const ref_1 = useRef(null);
  const ref_2 = useRef(null);
  const handle_pass = (type, value) => {
    setFail_pass(false);
    if (type === "pass-1") {
      if (value.length < 3) {
        setPass1(false);
        setPass1_err("رمز وارد شده کوتاه است");
      } else {
        setPass1(value);
        setPass1_err(false);
      }
    }
    if (type === "pass-2") {
      if (value.length < 3) {
        setPass2(false);
        setPass2_err("رمز وارد شده کوتاه است");
      } else {
        setPass2(value);
        setPass2_err(false);
      }
    }
  };
  const check_pass = (e) => {
    if (pass1 && pass2) {
      if (pass1 !== pass2) {
        setFail_pass("رمز های وارد شده با هم تطابق ندارند");
      } else {
        setPause(true);
        axios
          .patch(`${urls.password}${user.phone_number}`, {
            new_password: pass1,
          })
          .then((res) => {
            const { status, message } = res.data;
            setPause(false);
            if (status) {
              alert(message);
              setPass1(false);
              setPass2(false);
              ref_1.current.value = null;
              ref_2.current.value = null;
            } else {
              alert(message);
            }
          })
          .catch((e) => {
            console.log(e.message);
            setPause(false);
          });
      }
    } else {
      setFail_pass("رمزی وارد نشده");
    }
  };
  return (
    <section className="change-password-wrapper">
      <h2 className="box-title">تغییر رمز عبور</h2>
      <input
        type="password"
        name=""
        id="pass-1"
        placeholder="رمز را وارد کنید"
        onInput={({ target }) => {
          handle_pass("pass-1", target.value);
        }}
        ref={ref_1}
      />
      <input
        type="password"
        name=""
        id="pass-2"
        placeholder="تکرار رمز ورود"
        onInput={({ target }) => {
          handle_pass("pass-2", target.value);
        }}
        ref={ref_2}
      />
      {pause ? (
        <span className="submit-pass">
          <LittleLoading />
        </span>
      ) : (
        <span
          className="submit-pass"
          onClick={() => {
            check_pass();
          }}
        >
          ثبت رمز عبور
        </span>
      )}
      <span className="pass-erros">
        <span className="pass-error">{pass1_err ? pass1_err : ""}</span>
        <span className="pass-error">{pass2_err ? pass2_err : ""}</span>
        <span className="pass-error">{fail_pass ? fail_pass : ""}</span>
      </span>
    </section>
  );
};

export default Password;
