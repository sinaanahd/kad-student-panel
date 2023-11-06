import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import { DataContext } from "../data/datacontext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import convert_to_persian from "../functions/convert-to-persian";
import convert_days from "../functions/convert-days";
import JalaseDetials from "./jalase-detials/jalase-detials";
const JalasatPage = () => {
  const { kelasses, user, jalasat } = useContext(DataContext);
  const [active_jalase, set_active_jalase] = useState(
    jalasat ? jalasat[0] : false
  );
  const slug_id = parseInt(window.location.pathname.split("/")[2]);
  const kelas = kelasses ? kelasses.find((k) => k.kelas_id === slug_id) : false;
  const scroll_to_box = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <>
      <Helmet>
        <title>جلسات کلاس {kelas ? kelas.kelas_title : ""}</title>
      </Helmet>
      <div className="jalasat-page">
        <section className="done-jalasat">
          <div className="box-header">
            <h2 className="box-title">جلسات برگزار شده</h2>
          </div>
          <div className="jalasat-wrapper">
            {jalasat ? (
              jalasat
                .filter((j) => j.parent_kelas_id === slug_id)
                .map((j) => (
                  <div
                    className={
                      active_jalase
                        ? active_jalase.jalase_id === j.jalase_id
                          ? "jalase-item active"
                          : "jalase-item"
                        : "jalase-item"
                    }
                    key={j.jalase_id}
                  >
                    <span className="jalase-title">{j.jalase_title}</span>
                    <span className="jalase-time-datas">
                      <span className="day">
                        {convert_days(j.week_day_name)}
                      </span>
                      <span className="hour">
                        {convert_to_persian(j.start_time.split(":")[0])}-
                        {convert_to_persian(j.finish_time.split(":")[0])}
                      </span>
                    </span>
                    <span
                      className="see-detials-btn"
                      onClick={() => {
                        set_active_jalase(j);
                        scroll_to_box();
                      }}
                    >
                      مشاهده جزئیات
                    </span>
                  </div>
                ))
            ) : (
              <LittleLoading />
            )}
          </div>
        </section>
        {active_jalase ? (
          <JalaseDetials active_jalase={active_jalase} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default JalasatPage;
