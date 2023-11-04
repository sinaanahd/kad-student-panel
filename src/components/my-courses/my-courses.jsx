import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import LittleLoading from "../reuseables/little-loading";
import User_kelas from "./user-kelas/user-kelas";
import SpotData from "./spot-datas/spot-datas";
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
          <section className="active-classes">
            <div className="box-header">
              <h2 className="box-title">درحال برگزاری</h2>
              <div className="filters-wrapper">
                <span className="filter-btn active">کلاس‌های رایگان</span>
                <span className="filter-btn">ثبت نام شده</span>
              </div>
            </div>
            <div className="live-classes-wrapper">
              <div className="live-class">
                <img
                  src="https://kadschool.com/media/Kad_Kelas_Photos/Kelas_%D9%81%D9%84%D8%B3%D9%81%D9%87_%D9%88_%D9%85%D9%86%D8%B7%D9%82_%D8%A7%D8%B3%D8%AA%D8%A7%D8%AF_%D8%B3%D9%88%D8%AF%DB%8C%D8%A7%D9%86.webp"
                  alt="اسم کلاس"
                  width={131}
                  height={131}
                />
                <div className="class-text-details">
                  <span className="names-wrapper">
                    <span className="class-name">فسفه و منطق</span>
                    <span className="class-teacher">استاد هامون سبطی</span>
                  </span>
                  <span className="enter-class-btn">ورود به کلاس</span>
                  <span className="live-label">زنده</span>
                </div>
              </div>
              <div className="live-class">
                <img
                  src="https://kadschool.com/media/Kad_Kelas_Photos/Kelas_%D9%81%D9%84%D8%B3%D9%81%D9%87_%D9%88_%D9%85%D9%86%D8%B7%D9%82_%D8%A7%D8%B3%D8%AA%D8%A7%D8%AF_%D8%B3%D9%88%D8%AF%DB%8C%D8%A7%D9%86.webp"
                  alt="اسم کلاس"
                  width={131}
                  height={131}
                />
                <div className="class-text-details">
                  <span className="names-wrapper">
                    <span className="class-name">فسفه و منطق</span>
                    <span className="class-teacher">استاد هامون سبطی</span>
                  </span>
                  <span className="enter-class-btn">ورود به کلاس</span>
                  <span className="live-label">زنده</span>
                </div>
              </div>
              <div className="live-class">
                <img
                  src="https://kadschool.com/media/Kad_Kelas_Photos/Kelas_%D9%81%D9%84%D8%B3%D9%81%D9%87_%D9%88_%D9%85%D9%86%D8%B7%D9%82_%D8%A7%D8%B3%D8%AA%D8%A7%D8%AF_%D8%B3%D9%88%D8%AF%DB%8C%D8%A7%D9%86.webp"
                  alt="اسم کلاس"
                  height={131}
                  width={131}
                />
                <div className="class-text-details">
                  <span className="names-wrapper">
                    <span className="class-name">فسفه و منطق</span>
                    <span className="class-teacher">استاد هامون سبطی</span>
                  </span>
                  <span className="enter-class-btn">ورود به کلاس</span>
                  <span className="live-label">زنده</span>
                </div>
              </div>
            </div>
          </section>
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
            <div className="class-wrapper disabled">
              <span className="main-class-name">فسفه و منطق</span>
              <span className="main-class-teacher">استاد هامون سبطی</span>
              <span className="session-data">
                <span className="bad-news">کنسل شد !</span>
              </span>
              <span className="enter-to-class-btn">ورود به کلاس</span>
              <span className="enter-to-class-btn see-session">
                دیدن جلسات این کلاس
              </span>
            </div>
          </div>
        </section>
        <section className="notice-area-wrapper">
          <div className="box-header">
            <h2 className="box-title">اطلاعیه ها</h2>
          </div>
          <div className="notices-wrapper">
            <div className="notif-item">
              <span className="notuf-title">دلیل قطع دسترسی کلاس فلان :</span>
              <span className="notif-text">
                دلیل قطع دسترسیدلیل قطع دسترسیدلیل قطع دسترسیدلیل قطع دسترسیدلیل
                قطع دسترسی
              </span>
            </div>
            <div className="notif-item">
              <span className="notuf-title">قسط :</span>
              <span className="notif-text">
                وقتی موعد قسط نزدیک شده به کاربر اطلاع بدیم و یادآوری بکنیم
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MYCourses;
