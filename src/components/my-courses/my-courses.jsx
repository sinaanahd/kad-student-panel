import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import LittleLoading from "../reuseables/little-loading";
import User_kelas from "./user-kelas/user-kelas";
import SpotData from "./spot-datas/spot-datas";
import ActiveClasses from "./active-classes/active-classes";
import NotifPart from "./notifs/notif";
const MYCourses = () => {
  const { user, kelasses } = useContext(DataContext);
  const [filtered_classes, set_filtered_classess] = useState([]);
  const [active_filter, set_active_filter] = useState(false);
  const fill_classes = () => {
    if (!active_filter || active_filter === "all") {
      const kelas_ids = user.kelases;
      const all_kelasses = [];
      kelas_ids.forEach((k_id) => {
        const kelas = kelasses.find((k) => k.kelas_id === k_id);
        if (kelas) {
          all_kelasses.push(kelas);
        }
      });
      return all_kelasses;
    } else {
      return filtered_classes;
    }
  };

  const handle_class_filter = (type) => {
    set_active_filter(type);
    switch (type) {
      case "all":
        set_filtered_classess(kelasses);
        break;
      case "today": {
        const day_name = new Date().toLocaleDateString("en", {
          weekday: "long",
        });
        const filtered = kelasses.filter((k) =>
          k.stream_plans.length !== 0
            ? k.stream_plans[0].week_day_english === day_name
            : false
        );
        set_filtered_classess(filtered);
        break;
      }
      case "no-acc": {
        const no_acc_ids = [
          ...user.kelases222.map((k) => (!k.has_access ? k.kelas_id : false)),
        ];
        const filtered = kelasses.filter((k) =>
          no_acc_ids.includes(k.kelas_id)
        );
        set_filtered_classess(filtered);
        break;
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>درس های من</title>
      </Helmet>
      <div className="courses-page">
        <div className="courses-main-data">
          <SpotData />
          <ActiveClasses />
        </div>
        <section className="all-classes-wrapper">
          <div className="box-header">
            <h2 className="box-title">تمامی کلاس ها</h2>
            <div className="filters-wrapper">
              <span
                className={
                  active_filter === "all" || !active_filter
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() => {
                  handle_class_filter("all");
                }}
              >
                همه
              </span>
              <span
                className={
                  active_filter === "today" ? "filter-btn active" : "filter-btn"
                }
                onClick={() => {
                  handle_class_filter("today");
                }}
              >
                امروز
              </span>
              {/* <span className={active_filter === "" ? "filter-btn active" : "filter-btn"}>کلاس های هدیه</span> */}
              <span
                className={
                  active_filter === "no-acc"
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() => {
                  handle_class_filter("no-acc");
                }}
              >
                بدون دسترسی
              </span>
            </div>
          </div>
          <div className="all-classes">
            {user && kelasses ? (
              fill_classes().map((k) => (
                <User_kelas key={k.kelas_id} kelas={k} />
              ))
            ) : (
              <LittleLoading />
            )}
            {/* <div className="class-wrapper">
              <span className="main-class-name">فسفه و منطق</span>
              <span className="main-class-teacher">استاد هامون سبطی</span>
              <span className="session-data">
                <span className="session-name">اسم این جلسه</span>
                <span className="session-date-data">
                  <span className="week-day">چهارشنبه</span>
                  <span className="week-time">۱۰-۱۲</span>
                </span>
              </span>
              <span className="enter-to-class-btn">ورود به کلاس</span>
              <span className="enter-to-class-btn see-session">
                دیدن جلسات این کلاس
              </span>
            </div>
            <div className="class-wrapper">
              <span className="main-class-name">فسفه و منطق</span>
              <span className="main-class-teacher">استاد هامون سبطی</span>
              <span className="session-data">
                <span className="session-name">اسم این جلسه</span>
                <span className="session-date-data">
                  <span className="week-day">چهارشنبه</span>
                  <span className="week-time">۱۰-۱۲</span>
                </span>
              </span>
              <span className="enter-to-class-btn">ورود به کلاس</span>
              <span className="enter-to-class-btn see-session">
                دیدن جلسات این کلاس
              </span>
            </div>
            <div className="class-wrapper">
              <span className="main-class-name">فسفه و منطق</span>
              <span className="main-class-teacher">استاد هامون سبطی</span>
              <span className="session-data">
                <span className="session-name">اسم این جلسه</span>
                <span className="session-date-data">
                  <span className="week-day">چهارشنبه</span>
                  <span className="week-time">۱۰-۱۲</span>
                </span>
              </span>
              <span className="enter-to-class-btn">ورود به کلاس</span>
              <span className="enter-to-class-btn see-session">
                دیدن جلسات این کلاس
              </span>
            </div>
            <div className="class-wrapper">
            <span className="main-class-name">فسفه و منطق</span>
            <span className="main-class-teacher">استاد هامون سبطی</span>
            <span className="session-data">
            <span className="session-name">اسم این جلسه</span>
            <span className="session-date-data">
            <span className="week-day">چهارشنبه</span>
            <span className="week-time">۱۰-۱۲</span>
            </span>
            </span>
            <span className="enter-to-class-btn">ورود به کلاس</span>
            <span className="enter-to-class-btn see-session">
            دیدن جلسات این کلاس
            </span>
          </div> */}
            {/* <div className="class-wrapper disabled">
              <span className="main-class-name">فسفه و منطق</span>
              <span className="main-class-teacher">استاد هامون سبطی</span>
              <span className="session-data">
                <span className="bad-news">کنسل شد !</span>
              </span>
              <span className="enter-to-class-btn">ورود به کلاس</span>
              <span className="enter-to-class-btn see-session">
                دیدن جلسات این کلاس
              </span>
            </div> */}
          </div>
        </section>
        <NotifPart />
      </div>
    </>
  );
};

export default MYCourses;
