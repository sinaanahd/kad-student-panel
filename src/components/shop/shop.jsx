import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../data/datacontext";
import { Helmet } from "react-helmet";
import LittleLoading from "../reuseables/little-loading";
import SellKelas from "../sell-kelas/sell-kelas";
import arrow from "../../asset/images/shop/arrow-down.svg";
const ShopPage = () => {
  const { kelasses, doreha, subjects, years, courses } =
    useContext(DataContext);
  const [active_filter, set_active_filter] = useState(false);
  const [filtered_class, set_filtered_class] = useState(false);
  const [subject, set_subject] = useState(false);
  const [course, set_course] = useState(false);
  const [year, set_year] = useState(false);
  const [dore, set_dore] = useState(false);
  let count = 0;
  const handle_filter_options = (entry) => {
    if (entry === active_filter) {
      set_active_filter(false);
    } else {
      set_active_filter(entry);
    }
  };
  const handle_subject = (entry) => {
    set_subject(entry);
    set_active_filter(false);
  };
  const handle_year = (entry) => {
    set_active_filter(false);
    set_year(entry);
  };
  const handle_course = (entry) => {
    set_active_filter(false);
    set_course(entry);
  };
  const handle_dore = (entry) => {
    set_active_filter(false);
    set_dore(entry);
  };
  useEffect(() => {
    handle_filter();
  }, [subject, course, year, dore]);

  const handle_filter = () => {
    const filtered = [...kelasses];
    let course_filter = [];
    let subject_filter = [];
    let dore_filter = [];
    let year_filter = [];
    let counter = 0;
    if (course) {
      course_filter = filtered.filter((k) => k.course === course.course_id);
      counter++;
    }
    if (dore) {
      dore_filter = filtered.filter((k) => k.parent_dore_id === dore.dore_id);
      counter++;
    }
    if (year) {
      year_filter = filtered.filter((k) => k.year === year.id);
      counter++;
    }
    if (subject) {
      subject_filter = filtered.filter((k) => k.subject.includes(subject.id));
      counter++;
    }

    const all_in_one = course_filter.concat(
      subject_filter,
      dore_filter,
      year_filter
    );

    const objectCounts = {};

    // Count the occurrences of each object
    all_in_one.forEach((obj) => {
      const stringifiedObj = JSON.stringify(obj);
      objectCounts[stringifiedObj] = (objectCounts[stringifiedObj] || 0) + 1;
    });
    const final_kelasses = [];
    Object.entries(objectCounts).forEach(([stringifiedObj, count]) => {
      if (count === counter) {
        const obj = JSON.parse(stringifiedObj);
        final_kelasses.push({ ...obj, repetitionCount: count });
      }
    });
    if (!subject && !course && !dore && !year) {
      set_filtered_class(false);
    } else {
      set_filtered_class(final_kelasses);
    }
  };
  const reset_filters = () => {
    set_course(false);
    set_dore(false);
    set_subject(false);
    set_year(false);
  };
  return (
    <>
      <Helmet>
        <title>فروشگاه</title>
      </Helmet>
      <div className="shop-page">
        <section className="shop-filters-wrapper">
          <span className="filters-title">فیلتر های فروشگاه</span>
          <div className="shop-filter-options">
            <span className="shop-filter-option">
              <span
                className="main-filter"
                onClick={() => {
                  handle_filter_options("year");
                }}
              >
                <span className="filter-text">
                  {year ? year.name : "پایه تحصیلی"}
                </span>
                <span className="filter-img">
                  <img src={arrow} alt="باز کردن" width={11} height={22} />
                </span>
              </span>
              {active_filter === "year" ? (
                <span className="select-options">
                  {years ? (
                    years.map((y) => (
                      <span
                        className="select-option"
                        key={y.id}
                        onClick={() => {
                          handle_year(y);
                        }}
                      >
                        {y.name}
                      </span>
                    ))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              ) : (
                <></>
              )}
            </span>
            <span className="shop-filter-option">
              <span
                className="main-filter"
                onClick={() => {
                  handle_filter_options("subject");
                }}
              >
                <span className="filter-text">
                  {subject ? subject.name : "رشته تحصیلی"}
                </span>
                <span className="filter-img">
                  <img src={arrow} alt="باز کردن" width={11} height={22} />
                </span>
              </span>
              {active_filter === "subject" ? (
                <span className="select-options">
                  {subjects ? (
                    subjects.map((y) => (
                      <span
                        className="select-option"
                        key={y.id}
                        onClick={() => {
                          handle_subject(y);
                        }}
                      >
                        {y.name}
                      </span>
                    ))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              ) : (
                <></>
              )}
            </span>
            <span className="shop-filter-option">
              <span
                className="main-filter"
                onClick={() => {
                  handle_filter_options("dore");
                }}
              >
                <span className="filter-text">
                  {dore ? dore.dore_title : "دوره"}
                </span>
                <span className="filter-img">
                  <img src={arrow} alt="باز کردن" width={11} height={22} />
                </span>
              </span>
              {active_filter === "dore" ? (
                <span className="select-options">
                  {doreha ? (
                    doreha.map((y) => (
                      <span
                        className="select-option"
                        key={y.dore_id}
                        onClick={() => {
                          handle_dore(y);
                        }}
                      >
                        {y.dore_title}
                      </span>
                    ))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              ) : (
                <></>
              )}
            </span>
            <span className="shop-filter-option">
              <span
                className="main-filter"
                onClick={() => {
                  handle_filter_options("course");
                }}
              >
                <span className="filter-text">
                  {course ? course.name : "درس"}
                </span>
                <span className="filter-img">
                  <img src={arrow} alt="باز کردن" width={11} height={22} />
                </span>
              </span>
              {active_filter === "course" ? (
                <span className="select-options courses">
                  {courses ? (
                    courses.map((y) => (
                      <span
                        className="select-option"
                        key={y.course_id}
                        onClick={() => {
                          handle_course(y);
                        }}
                      >
                        {y.name}
                      </span>
                    ))
                  ) : (
                    <LittleLoading />
                  )}
                </span>
              ) : (
                <></>
              )}
            </span>
          </div>
        </section>
        <section className="products-place">
          <h1 className="title">فروشگاه کاد</h1>
          <div className="all-classes-wrapper">
            {!filtered_class ? (
              kelasses ? (
                kelasses.map((k) => <SellKelas key={k.kelas_id} kelas={k} />)
              ) : (
                <LittleLoading />
              )
            ) : filtered_class.length === 0 ? (
              <span className="no-prod-found">
                <p className="no-text">
                  دوست خوبم متاسفانه کلاسی با فیلتر های انتخابیت پیدا نشد !
                </p>
                <span className="reset-filter" onClick={reset_filters}>
                  بازگردانی فیلتر ها
                </span>
              </span>
            ) : (
              filtered_class.map((k) => (
                <SellKelas key={k.kelas_id} kelas={k} />
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ShopPage;
