import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
const NotifPart = () => {
  const { user, kelasses } = useContext(DataContext);

  const disabled_classes_finder = () => {
    const arr = [];
    user.kelases.forEach((kelas) => {
      const found = user.kelases222.find(
        (k) => k.kelas_id === kelas && !k.has_access
      );
      if (found) {
        arr.push(kelas);
      }
    });
    // const arr_to_log = kelasses.filter((k) => arr.includes(k.kelas_id));
    // console.log(arr_to_log);
    return arr;
  };
  return (
    <section className="notice-area-wrapper">
      <div className="box-header">
        <h2 className="box-title">اطلاعیه ها</h2>
      </div>
      <div className="notices-wrapper">
        {user && kelasses ? (
          disabled_classes_finder().length !== 0 ? (
            disabled_classes_finder().map((k, i) =>
              kelasses.find((kelas) => kelas.kelas_id === k) ? (
                <div className="notif-item" key={i++}>
                  <span className="notuf-title">
                    قطع دسترسی کلاس{" "}
                    {kelasses.find((kelas) => kelas.kelas_id === k).kelas_title}{" "}
                    :
                  </span>
                  <span className="notif-text">
                    دوست عزیزم ! به علت عدم پرداخت صورتحسابت ، دسترسیت به بعضی
                    از کلاس‌ها موقتا غیر فعال شده ... برای پرداخت ، به صفحه ی
                    امور مالی برو و اگر مشکلی بود با پشتیبانی کاد تماس بگیر .
                  </span>
                </div>
              ) : (
                <></>
              )
            )
          ) : (
            <div className="notif-item">موردی برای نمایش وجود ندارد</div>
          )
        ) : (
          <div className="notif-item">موردی برای نمایش وجود ندارد</div>
        )}
      </div>
    </section>
  );
};

export default NotifPart;
