import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../../data/datacontext";
import sample_banner from "../../../asset/images/dashboard/sample-banner.jpg";
import LittleLoading from "../../reuseables/little-loading";
const DashboardSlider = () => {
  const { banners } = useContext(DataContext);
  const [active_slide, set_active_slide] = useState(0);
  const slider_ref = useRef(null);
  const needed_banners = banners
    ? banners.filter((b) => b.banner_type === "main_page_banners")
    : false;
  const handle_slider = (num) => {
    const parent_slider = [...slider_ref.current.children].filter((c) =>
      c.classList.contains("banner-item")
    );
    parent_slider.forEach((child) => {
      child.style.transform = `translateX(${num * 100}%)`;
    });
    set_active_slide(num);
  };
  return (
    <>
      <section className="banners-wrapper" ref={slider_ref}>
        {needed_banners ? (
          needed_banners.map((b) => (
            <div key={b.banner_id} className="banner-item">
              <img src={b.image_link} alt="بنر" />
            </div>
          ))
        ) : (
          <LittleLoading />
        )}
        {needed_banners && needed_banners.length !== 1 ? (
          <div className="banners-dot">
            {needed_banners.map((b, i) => (
              <button
                className={
                  i === active_slide ? "banner-dot active" : "banner-dot"
                }
                onClick={() => {
                  handle_slider(i - 1);
                }}
                key={i++}
              ></button>
            ))}

            {/* <button className="banner-dot"></button>
            <button className="banner-dot"></button>
            <button className="banner-dot"></button>
            <button className="banner-dot"></button> */}
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default DashboardSlider;
