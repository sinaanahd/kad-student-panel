import React, { useState, useContext } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
const Calneder = ({ active_plan }) => {
  const { user, kelasses, jalasat } = useContext(DataContext);
  const make_week_plan = (e) => {
    const week_plan = [];
    if (active_plan === "all") {
      kelasses.forEach((k) => {
        const obj = {
          Saturday: false,
          Sunday: false,
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
        };
        if (k.stream_plans.length !== 0) {
          k.stream_plans.forEach((sp) => {
            const jalase = jalasat.findLast(
              (j) => j.parent_kelas_id === k.kelas_id
            );
            if (jalase) {
              obj[sp.week_day_english] = {
                teacher: `${k.kelas_title_and_ostad_name.split("استاد")[1]}`,
                time: `${convert_to_persian(
                  sp.start_time.split(":")[0]
                )} - ${convert_to_persian(sp.finish_time.split(":")[0])}`,
                jalase: jalase.jalase_title.split("-")[0],
              };
            }
          });
          week_plan.push({ ...obj, name: k.kelas_title });
        }
      });
    } else if (active_plan === "my") {
      const user_kelasses = kelasses.filter((k) =>
        user.kelases.includes(k.kelas_id)
      );
      user_kelasses.forEach((k) => {
        const obj = {
          Saturday: false,
          Sunday: false,
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
        };
        if (k.stream_plans.length !== 0) {
          k.stream_plans.forEach((sp) => {
            const jalase = jalasat.findLast(
              (j) => j.parent_kelas_id === k.kelas_id
            );
            if (jalase) {
              obj[sp.week_day_english] = {
                teacher: `${k.kelas_title_and_ostad_name.split("استاد")[1]}`,
                time: `${convert_to_persian(
                  sp.start_time.split(":")[0]
                )} - ${convert_to_persian(sp.finish_time.split(":")[0])}`,
                jalase: jalase.jalase_title.split("-")[0],
              };
            }
          });
          week_plan.push({ ...obj, name: k.kelas_title });
        }
      });
    }
    return week_plan;
  };
  const today = new Date().toLocaleDateString("en", { weekday: "long" });
  return (
    <div
      className="calender-box"
      onClick={() => {
        if (kelasses) {
          make_week_plan();
        }
      }}
    >
      <div className="cal-header cal-row">
        <span className="cal-item heder-item">کلاس</span>
        <span
          className={
            today === "Saturday"
              ? "cal-item heder-item active-day"
              : "cal-item heder-item"
          }
        >
          شنبه
        </span>
        <span
          className={
            today === "Sunday"
              ? "cal-item heder-item active-day"
              : "cal-item heder-item"
          }
        >
          یکشنبه
        </span>
        <span
          className={
            today === "Monday"
              ? "cal-item heder-item active-day"
              : "cal-item heder-item"
          }
        >
          دوشنبه
        </span>
        <span
          className={
            today === "Tuesday"
              ? "cal-item heder-item active-day"
              : "cal-item heder-item"
          }
        >
          سه شنبه
        </span>
        <span
          className={
            today === "Wednesday"
              ? "cal-item heder-item active-day"
              : "cal-item heder-item"
          }
        >
          چهارشنبه
        </span>
        <span
          className={
            today === "Thursday"
              ? "cal-item heder-item active-day"
              : "cal-item heder-item"
          }
        >
          پنجشنبه
        </span>
        <span
          className={
            today === "Friday"
              ? "cal-item heder-item last-col active-day"
              : "cal-item heder-item last-col"
          }
        >
          جمعه
        </span>
      </div>
      {kelasses && jalasat ? (
        make_week_plan().length !== 0 ? (
          make_week_plan().map((wp, i) => (
            <div className="cal-row" key={i++}>
              <span className="cal-item first-col">{wp.name}</span>
              <span className="cal-item">
                {wp.Saturday ? (
                  <div
                    className={
                      today !== "Saturday"
                        ? "class-with-session not-active"
                        : "class-with-session"
                    }
                  >
                    <span className="cal-teacher-name">
                      {wp.Saturday.teacher}
                    </span>
                    <span className="cal-session-name">
                      {wp.Saturday.jalase}
                    </span>
                    <span className="session-time">{wp.Saturday.time}</span>
                  </div>
                ) : (
                  <></>
                )}
              </span>
              <span className="cal-item">
                {wp.Sunday ? (
                  <div
                    className={
                      today !== "Sunday"
                        ? "class-with-session not-active"
                        : "class-with-session"
                    }
                  >
                    <span className="cal-teacher-name">
                      {wp.Sunday.teacher}
                    </span>
                    <span className="cal-session-name">{wp.Sunday.jalase}</span>
                    <span className="session-time">{wp.Sunday.time}</span>
                  </div>
                ) : (
                  <></>
                )}
              </span>
              <span className="cal-item">
                {wp.Monday ? (
                  <div
                    className={
                      today !== "Monday"
                        ? "class-with-session not-active"
                        : "class-with-session"
                    }
                  >
                    <span className="cal-teacher-name">
                      {wp.Monday.teacher}
                    </span>
                    <span className="cal-session-name">{wp.Monday.jalase}</span>
                    <span className="session-time">{wp.Monday.time}</span>
                  </div>
                ) : (
                  <></>
                )}
              </span>
              <span className="cal-item">
                {wp.Tuesday ? (
                  <div
                    className={
                      today !== "Tuesday"
                        ? "class-with-session not-active"
                        : "class-with-session"
                    }
                  >
                    <span className="cal-teacher-name">
                      {wp.Tuesday.teacher}
                    </span>
                    <span className="cal-session-name">
                      {wp.Tuesday.jalase}
                    </span>
                    <span className="session-time">{wp.Tuesday.time}</span>
                  </div>
                ) : (
                  <></>
                )}
              </span>
              <span className="cal-item">
                {wp.Wednesday ? (
                  <div
                    className={
                      today !== "Wednesday"
                        ? "class-with-session not-active"
                        : "class-with-session"
                    }
                  >
                    <span className="cal-teacher-name">
                      {wp.Wednesday.teacher}
                    </span>
                    <span className="cal-session-name">
                      {wp.Wednesday.jalase}
                    </span>
                    <span className="session-time">{wp.Wednesday.time}</span>
                  </div>
                ) : (
                  <></>
                )}
              </span>
              <span className="cal-item">
                {wp.Thursday ? (
                  <div
                    className={
                      today !== "Thursday"
                        ? "class-with-session not-active"
                        : "class-with-session"
                    }
                  >
                    <span className="cal-teacher-name">
                      {wp.Thursday.teacher}
                    </span>
                    <span className="cal-session-name">
                      {wp.Thursday.jalase}
                    </span>
                    <span className="session-time">{wp.Thursday.time}</span>
                  </div>
                ) : (
                  <></>
                )}
              </span>
              <span className="cal-item last-col">
                {wp.Friday ? (
                  <div
                    className={
                      today !== "Friday"
                        ? "class-with-session not-active"
                        : "class-with-session"
                    }
                  >
                    <span className="cal-teacher-name">
                      {wp.Friday.teacher}
                    </span>
                    <span className="cal-session-name">{wp.Friday.jalase}</span>
                    <span className="session-time">{wp.Friday.time}</span>
                  </div>
                ) : (
                  <></>
                )}
              </span>
            </div>
          ))
        ) : (
          <span className="nothing-to-show">دوست خوبم شما کلاسی نداری !</span>
        )
      ) : (
        <LittleLoading />
      )}
    </div>
  );
};

export default Calneder;
