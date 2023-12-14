import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../data/datacontext";
import LittleLoading from "../reuseables/little-loading";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const OnlineStream = () => {
  const { user, kelasses } = useContext(DataContext);
  const [link, set_link] = useState(false);
  const page_slug = parseInt(window.location.pathname.split("/")[2]);
  const kelas = kelasses
    ? kelasses.find((k) => k.kelas_id === page_slug)
    : false;
  useEffect(() => {
    const page_slug = parseInt(window.location.pathname.split("/")[2]);
    if (user) {
      const kelas = user.kelases222.find(
        (k) => k.kelas_id === page_slug && k.has_access
      );
      if (kelas) {
        const link = user.kelases_direct_links[page_slug];
        set_link(link);
      } else {
        set_link("no-acc");
      }
    } else {
      window.location.pathname = "/login";
    }
  }, []);
  return (
    <div className="stream-wrapper-item">
      <h1 className="title">
        کلاس آنلاین {kelas ? kelas.kelas_title : <LittleLoading />}
      </h1>
      {link ? (
        link !== "no-acc" ? (
          <iframe
            src={link}
            allowFullScreen={true}
            allow="autoplay;fullscreen;speaker;microphone;camera;display-capture"
          ></iframe>
        ) : (
          <div className="no-acc">
            <p>
              دوست عزیزم ! به علت عدم پرداخت صورتحسابت ، دسترسیت به بعضی از
              کلاس‌ها موقتا غیر فعال شده ... برای پرداخت ، به صفحه ی امور مالی
              برو و اگر مشکلی بود با پشتیبانی کاد تماس بگیر .
            </p>
            <Link to="/finance">رفتن به صفحه امور مالی</Link>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default OnlineStream;
