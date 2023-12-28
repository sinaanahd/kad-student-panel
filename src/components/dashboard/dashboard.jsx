import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import convert_to_persian from "../functions/convert-to-persian";
import split_in_three from "../functions/spilit_in_three";
import LittleLoading from "../reuseables/little-loading";
import DashboardClass from "./dashboard-class/dashboard-class";
import Calneder from "./calender/calender";
import SellKelas from "../sell-kelas/sell-kelas";
import DashboardSlider from "./dashboard-sliders/dashboard-slider";
import ReloadBtn from "../reuseables/reload-btn/reload-btn";
const DashboardPage = () => {
  const { user, setUser, get_user, kelasses, get_kelasses, setKelasses } =
    useContext(DataContext);
  const [active_plan, set_active_plan] = useState("all");
  const handle_reload = () => {
    const id = user.user_id;
    setUser(false);
    get_user(id);
    setKelasses(false);
    get_kelasses();
  };
  return (
    <>
      <Helmet>
        <title>میزکاربری</title>
      </Helmet>
      <div className="dashboard-page">
        <DashboardSlider />
        {/* <section className="new-classes-wrapper">
          <h2 className="title">کلاس های جدید</h2>
          <div className="classes-wrapper">
            {kelasses ? (
              kelasses.map((k) => <SellKelas kelas={k} key={k.kelas_id} />)
            ) : (
              <LittleLoading />
            )}
          </div>
          <div className="dots-wrapper">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </section> */}
        <section className="calender-wrapper">
          <div className="cal-title-wrapper">
            <h2 className="title">برنامه هفتگی</h2>
            <div className="filter-options">
              <span
                className={
                  active_plan === "all"
                    ? "filter-option active"
                    : "filter-option"
                }
                onClick={() => {
                  set_active_plan("all");
                }}
              >
                تمامی کلاس ها
              </span>
              <span
                className={
                  active_plan === "my"
                    ? "filter-option active"
                    : "filter-option"
                }
                onClick={() => {
                  set_active_plan("my");
                }}
              >
                کلاس های من
              </span>
            </div>
            <ReloadBtn click={handle_reload} />
          </div>
          <Calneder active_plan={active_plan} />
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
