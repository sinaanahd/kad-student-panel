import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
const JalaseDetials = ({ active_jalase }) => {
  const { sample_files } = useContext(DataContext);
  const [active_filter, set_active_filter] = useState("azmon");
  const azmonha = sample_files
    ? sample_files.pdf_sample_files.filter(
        (p) =>
          p.jalase_id === active_jalase.jalase_id &&
          p.file_type === "نمونه آزمون"
      )
    : [];
  const takalif = sample_files
    ? sample_files.pdf_sample_files.filter(
        (p) =>
          p.jalase_id === active_jalase.jalase_id &&
          p.file_type === "نمونه تکلیف"
      )
    : [];
  const jozveha = sample_files
    ? sample_files.pdf_sample_files.filter(
        (p) =>
          p.jalase_id === active_jalase.jalase_id &&
          p.file_type === "نمونه جزوه"
      )
    : [];
  return (
    <section className="session-detail">
      <div className="box-header">
        <h2 className="box-title">
          جزئیات جلسه {active_jalase.jalase_title}-{active_jalase.jalase_id}
        </h2>
      </div>
      <div className="main-row">
        <div className="flies-wrapper">
          <span className="file-title">فایل های این جلسه</span>
          <div className="file-filters">
            <span
              onClick={() => {
                set_active_filter("azmon");
              }}
              className={
                active_filter === "azmon" ? "file-filter active" : "file-filter"
              }
            >
              آزمون ها
            </span>
            <span
              onClick={() => {
                set_active_filter("taklif");
              }}
              className={
                active_filter === "taklif"
                  ? "file-filter active"
                  : "file-filter"
              }
            >
              تکالیف
            </span>
            <span
              onClick={() => {
                set_active_filter("jozve");
              }}
              className={
                active_filter === "jozve" ? "file-filter active" : "file-filter"
              }
            >
              جزوات
            </span>
          </div>
          {active_filter === "azmon" ? (
            azmonha.length !== 0 ? (
              azmonha.map((a, i) => (
                <div className="file-row" key={a.file_id}>
                  <span className="file-row-item">{i + 1}</span>
                  <span className="file-row-item">{a.title}</span>
                  <a
                    target="_blank"
                    href={a.file_link}
                    className="file-row-item"
                    download
                  >
                    دانلود
                  </a>
                </div>
              ))
            ) : (
              <div className="file-row">موردی برای نمایش وجود ندارد</div>
            )
          ) : (
            <></>
          )}
          {active_filter === "jozve" ? (
            jozveha.length !== 0 ? (
              jozveha.map((a, i) => (
                <div className="file-row" key={a.file_id}>
                  <span className="file-row-item">{i + 1}</span>
                  <span className="file-row-item">{a.title}</span>
                  <a
                    target="_blank"
                    href={a.file_link}
                    className="file-row-item"
                    download
                  >
                    دانلود
                  </a>
                </div>
              ))
            ) : (
              <div className="file-row">موردی برای نمایش وجود ندارد</div>
            )
          ) : (
            <></>
          )}
          {active_filter === "taklif" ? (
            takalif.length !== 0 ? (
              takalif.map((a, i) => (
                <div className="file-row" key={a.file_id}>
                  <span className="file-row-item">{i + 1}</span>
                  <span className="file-row-item">{a.title}</span>
                  <a
                    target="_blank"
                    href={a.file_link}
                    className="file-row-item"
                    download
                  >
                    دانلود
                  </a>
                </div>
              ))
            ) : (
              <div className="file-row">موردی برای نمایش وجود ندارد</div>
            )
          ) : (
            <></>
          )}
          {/* <div className="file-row">
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
          </div> */}
        </div>
        {/* <div className="watch-offline-video-wrapper">
              <span className="offline-title">مشاهده آفلاین جلسه</span>
              <span className="video-box"></span>
            </div> */}
      </div>
    </section>
  );
};

export default JalaseDetials;
