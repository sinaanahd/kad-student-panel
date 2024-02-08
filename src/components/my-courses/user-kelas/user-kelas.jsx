import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scroll_to_top from "../../functions/scroll";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import convert_days from "../../functions/convert-days";
import convert_to_persian from "../../functions/convert-to-persian";
const User_kelas = ({ kelas }) => {
  const { jalasat, user } = useContext(DataContext);
  const [class_time, set_class_time] = useState(false);
  const [is_fail, set_is_fail] = useState(false);
  const check_kelas_time = (entry) => {
    const today = new Date();
    const day = today.toLocaleDateString("en", { weekday: "long" });
    const hour = today.getHours();
    const minutes = today.getMinutes();
    const today_class_time = {
      ...entry.find((time) => time.week_day_english === day),
    };
    if (Object.keys(today_class_time).length !== 0) {
      let { start_time, finish_time } = today_class_time;
      const start_minute = parseInt(start_time.split(":")[1]);
      start_time = parseInt(start_time.split(":")[0]);
      finish_time = parseInt(finish_time.split(":")[0]);
      if (start_time * 60 + start_minute - (hour * 60 + minutes) < 15) {
        window.open(kelas.skyRoom_link);
      } else {
        set_class_time(true);
      }
    } else {
      set_class_time(true);
    }
  };
  const active_kelas_show = () => {
    const today = new Date();
    const day = today.toLocaleDateString("en", { weekday: "long" });
    const hour = today.getHours();
    // const hour = 16;
    const minutes = today.getMinutes();
    // const minutes = 16;
    const today_class_time = {
      ...kelas.stream_plans.find((time) => time.week_day_english === day),
    };
    if (Object.keys(today_class_time).length !== 0) {
      let { start_time, finish_time } = today_class_time;
      const finish_minutes = finish_time.split(":")[1];
      const start_minute = parseInt(start_time.split(":")[1]);
      start_time = parseInt(start_time.split(":")[0]);
      finish_time = parseInt(finish_time.split(":")[0]);
      if (start_time * 60 + start_minute - (hour * 60 + minutes) < 15) {
        if (hour === finish_time && minutes <= finish_minutes) {
          return true;
        } else if (hour < finish_time) {
          return true;
        } else if (hour === finish_time && minutes > finish_minutes) {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const check_accsess = () => {
    const { kelases222 } = user;
    const found = kelases222.find((k) => k.kelas_id === kelas.kelas_id);
    if (found) {
      if (!found.has_access) set_is_fail(true);
    }
  };
  useEffect(() => {
    check_accsess();
  }, []);
  return (
    <>
      {user ? (
        is_fail ? (
          <div className="class-wrapper disabled">
            <span className="main-class-name">{kelas.kelas_title}</span>
            <span className="main-class-teacher">
              {"استاد " + kelas.kelas_title_and_ostad_name.split("استاد")[1]}
            </span>
            <span className="session-data">
              <span className="bad-news">قطع دسترسی !</span>
            </span>
            {kelas.parent_dore_id !== 6 ? (
              <span className="enter-to-class-btn">
                {class_time ? "زمان کلاس نیست" : "ورود به کلاس"}
              </span>
            ) : (
              <span className="enter-to-class-btn">ورود به کلاس</span>
            )}
            <span className="enter-to-class-btn see-session">
              دیدن جلسات این کلاس
            </span>
          </div>
        ) : (
          <div
            className={
              active_kelas_show()
                ? "class-wrapper class-is-active"
                : "class-wrapper"
            }
          >
            <span className="main-class-name">{kelas.kelas_title}</span>
            <span className="main-class-teacher">
              {"استاد " + kelas.kelas_title_and_ostad_name.split("استاد")[1]}
            </span>
            <span className="session-data">
              <span className="session-name">
                {jalasat ? (
                  jalasat.findLast(
                    (j) => j.parent_kelas_id === kelas.kelas_id
                  ) ? (
                    jalasat.findLast(
                      (j) => j.parent_kelas_id === kelas.kelas_id
                    ).jalase_title
                  ) : (
                    "اسم وارد نشده"
                  )
                ) : (
                  <LittleLoading />
                )}
              </span>
              <span className="session-date-data">
                {jalasat ? (
                  jalasat.findLast(
                    (j) => j.parent_kelas_id === kelas.kelas_id
                  ) ? (
                    <>
                      <span className="week-day">
                        {convert_days(
                          jalasat.findLast(
                            (j) => j.parent_kelas_id === kelas.kelas_id
                          ).week_day_name
                        )}
                      </span>
                      <span className="week-time">
                        {convert_to_persian(
                          jalasat
                            .findLast(
                              (j) => j.parent_kelas_id === kelas.kelas_id
                            )
                            .start_time.split(":")[0]
                        )}
                        -
                        {convert_to_persian(
                          jalasat
                            .findLast(
                              (j) => j.parent_kelas_id === kelas.kelas_id
                            )
                            .finish_time.split(":")[0]
                        )}
                      </span>
                    </>
                  ) : (
                    "آفلاین"
                  )
                ) : (
                  <LittleLoading />
                )}
              </span>
            </span>
            {kelas.parent_dore_id !== 6 ? (
              <span
                className="enter-to-class-btn"
                onClick={() => {
                  window.open(kelas.skyRoom_link);
                  // check_kelas_time(kelas.stream_plans);
                }}
              >
                {class_time ? "زمان کلاس نیست" : "ورود به کلاس"}
              </span>
            ) : (
              <a
                href="https://app.spotplayer.ir"
                target="_blank"
                className="enter-to-class-btn"
              >
                ورود به کلاس
              </a>
            )}
            <Link
              to={`/jalasat/${kelas.kelas_id}`}
              onClick={scroll_to_top}
              className="enter-to-class-btn see-session"
            >
              دیدن جلسات این کلاس
            </Link>
          </div>
        )
      ) : (
        <LittleLoading />
      )}
    </>
  );
};

export default User_kelas;
