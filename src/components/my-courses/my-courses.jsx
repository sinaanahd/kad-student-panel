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
  const fill_classes = () => {
    const kelas_ids = user.kelases;
    // console.log(kelas_ids, kelasses);
    const all_kelasses = [];
    kelas_ids.forEach((k_id) => {
      const kelas = kelasses.find((k) => k.kelas_id === k_id);
      if (kelas) {
        all_kelasses.push(kelas);
      }
    });
    // console.log(all_kelasses);
    return all_kelasses;
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
              <span className="filter-btn active">همه</span>
              <span className="filter-btn">امروز</span>
              <span className="filter-btn">کلاس های هدیه</span>
              <span className="filter-btn">ثبت نام شده</span>
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
