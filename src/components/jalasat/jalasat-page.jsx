import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import { DataContext } from "../data/datacontext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const JalasatPage = () => {
  const { kelasses, user } = useContext(DataContext);
  return (
    <>
      <Helmet>
        <title>جلسات کلاس فلان</title>
      </Helmet>
      <div className="jalasat-page">
        <section className="done-jalasat">
          <div className="box-header">
            <h2 className="box-title">جلسات برگزار شده</h2>
          </div>
          <div className="jalasat-wrapper">
            <div className="jalase-item active">
              <span className="jalase-title">اسم این جلسه</span>
              <span className="jalase-time-datas">
                <span className="day">چهارشنبه</span>
                <span className="hour">۱۰-۱۲</span>
              </span>
              <span className="see-detials-btn">مشاهده جزئیات</span>
            </div>
            <div className="jalase-item">
              <span className="jalase-title">اسم این جلسه</span>
              <span className="jalase-time-datas">
                <span className="day">چهارشنبه</span>
                <span className="hour">۱۰-۱۲</span>
              </span>
              <span className="see-detials-btn">مشاهده جزئیات</span>
            </div>
            <div className="jalase-item">
              <span className="jalase-title">اسم این جلسه</span>
              <span className="jalase-time-datas">
                <span className="day">چهارشنبه</span>
                <span className="hour">۱۰-۱۲</span>
              </span>
              <span className="see-detials-btn">مشاهده جزئیات</span>
            </div>
            <div className="jalase-item">
              <span className="jalase-title">اسم این جلسه</span>
              <span className="jalase-time-datas">
                <span className="day">چهارشنبه</span>
                <span className="hour">۱۰-۱۲</span>
              </span>
              <span className="see-detials-btn">مشاهده جزئیات</span>
            </div>
            <div className="jalase-item">
              <span className="jalase-title">اسم این جلسه</span>
              <span className="jalase-time-datas">
                <span className="day">چهارشنبه</span>
                <span className="hour">۱۰-۱۲</span>
              </span>
              <span className="see-detials-btn">مشاهده جزئیات</span>
            </div>
            <div className="jalase-item">
              <span className="jalase-title">اسم این جلسه</span>
              <span className="jalase-time-datas">
                <span className="day">چهارشنبه</span>
                <span className="hour">۱۰-۱۲</span>
              </span>
              <span className="see-detials-btn">مشاهده جزئیات</span>
            </div>
            <div className="jalase-item">
              <span className="jalase-title">اسم این جلسه</span>
              <span className="jalase-time-datas">
                <span className="day">چهارشنبه</span>
                <span className="hour">۱۰-۱۲</span>
              </span>
              <span className="see-detials-btn">مشاهده جزئیات</span>
            </div>
            <div className="jalase-item">
              <span className="jalase-title">اسم این جلسه</span>
              <span className="jalase-time-datas">
                <span className="day">چهارشنبه</span>
                <span className="hour">۱۰-۱۲</span>
              </span>
              <span className="see-detials-btn">مشاهده جزئیات</span>
            </div>
            <div className="jalase-item">
              <span className="jalase-title">اسم این جلسه</span>
              <span className="jalase-time-datas">
                <span className="day">چهارشنبه</span>
                <span className="hour">۱۰-۱۲</span>
              </span>
              <span className="see-detials-btn">مشاهده جزئیات</span>
            </div>
          </div>
        </section>
        <section className="session-detail">
          <div className="box-header">
            <h2 className="box-title">جزئیات جلسه</h2>
          </div>
          <div className="main-row">
            <div className="flies-wrapper">
              <span className="file-title">فایل های این جلسه</span>
              <div className="file-filters">
                <span className="file-filter active">آزمون ها</span>
                <span className="file-filter">تکالیف</span>
                <span className="file-filter">جزوات</span>
              </div>
              <div className="file-row">
                <span className="file-row-item">1</span>
                <span className="file-row-item">فسفه و منطق</span>
                <span className="file-row-item">دانلود</span>
              </div>
              <div className="file-row">
                <span className="file-row-item">1</span>
                <span className="file-row-item">فسفه و منطق</span>
                <span className="file-row-item">دانلود</span>
              </div>
              <div className="file-row">
                <span className="file-row-item">1</span>
                <span className="file-row-item">فسفه و منطق</span>
                <span className="file-row-item">دانلود</span>
              </div>
              <div className="file-row">
                <span className="file-row-item">1</span>
                <span className="file-row-item">فسفه و منطق</span>
                <span className="file-row-item">دانلود</span>
              </div>
            </div>
            <div className="watch-offline-video-wrapper">
              <span className="offline-title">مشاهده آفلاین جلسه</span>
              <span className="video-box"></span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JalasatPage;
