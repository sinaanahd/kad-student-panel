import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
const ActiveClasses = () => {
  const { kelasses, user } = useContext(DataContext);
  const find_active_classes = (e) => {
    const live_classes = [];
    kelasses.forEach((k) => {
      if (
        active_kelas_show(k) &&
        user.kelases.includes(k.kelas_id) &&
        !user.no_access.includes(k.kelas_id)
      ) {
        live_classes.push(k);
      }
    });
    return live_classes;
  };
  const active_kelas_show = (kelas) => {
    const check_kelas = user.kelases222.find(
      (k) => k.kelas_id === kelas.kelas_id
    );
    // console.log(check_kelas, kelas);
    if (check_kelas && check_kelas.has_access) {
      const today = new Date();
      const day = today.toLocaleDateString("en", { weekday: "long" });
      const hour = today.getHours();
      const minutes = today.getMinutes();
      // const hour = 16;
      // const minutes = 0;
      const today_class_time = {
        ...kelas.stream_plans.find((time) => time.week_day_english === day),
      };
      if (Object.keys(today_class_time).length !== 0) {
        let { start_time, finish_time } = today_class_time;
        const start_minute = parseInt(start_time.split(":")[1]);
        const finish_minutes = finish_time.split(":")[1];
        start_time = parseInt(start_time.split(":")[0]);
        finish_time = parseInt(finish_time.split(":")[0]);
        if (start_time * 60 + start_minute - (hour * 60 + minutes) < 15) {
          if (hour <= finish_time) {
            if (hour === finish_time && minutes <= finish_minutes) {
              return true;
            } else if (hour < finish_time) {
              return true;
            } else if (hour === finish_time && minutes > finish_minutes) {
              return false;
            }
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  return (
    <section className="active-classes">
      <div className="box-header">
        <h2 className="box-title">درحال برگزاری</h2>
        {/* <div className="filters-wrapper">
          <span className="filter-btn active">کلاس‌های رایگان</span>
          <span className="filter-btn">ثبت نام شده</span>
        </div> */}
      </div>
      <div className="live-classes-wrapper">
        {kelasses && user ? (
          find_active_classes().length !== 0 ? (
            find_active_classes().map((k) => (
              <div className="live-class" key={k.kelas_id}>
                <img
                  src={k.image_link}
                  alt={k.kelas_title}
                  width={131}
                  height={131}
                />
                <div className="class-text-details">
                  <span className="names-wrapper">
                    <span className="class-name">{k.kelas_title}</span>
                    <span className="class-teacher">
                      {"استاد " +
                        k.kelas_title_and_ostad_name.split("استاد")[1]}
                    </span>
                  </span>
                  <a
                    target="_blank"
                    href={
                      user.kelases_direct_links[k.kelas_id]
                        ? user.kelases_direct_links[k.kelas_id]
                        : k.skyRoom_link
                    }
                    className="enter-class-btn"
                  >
                    ورود به کلاس
                  </a>
                  <span className="live-label">زنده</span>
                </div>
              </div>
            ))
          ) : (
            <span className="no-class">کلاسی در حال برگزاری نیست !</span>
          )
        ) : (
          <span className="no-class">کلاسی در حال برگزاری نیست !</span>
        )}

        {/* <div className="live-class">
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
        </div> */}
      </div>
    </section>
  );
};

export default ActiveClasses;
