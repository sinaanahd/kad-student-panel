import React, { useState } from "react";
import { Helmet } from "react-helmet";
import SpotData from "../my-courses/spot-datas/spot-datas";
import spot_guid_img_1 from "../../asset/images/guides/spot-guide-1.jpg";
import spot_guid_img_2 from "../../asset/images/guides/spot-guide-2.jpg";
import spot_guid_img_3 from "../../asset/images/guides/spot-guide-3.jpg";
const GuidePage = () => {
  const [open_links, set_open_links] = useState(false);
  return (
    <>
      <Helmet>
        <title>آموزش ها</title>
      </Helmet>
      <div className="guide-page">
        <section className="spot-player">
          <div className="box-header">
            <h2 className="box-title">تمامی کلاس ها</h2>
          </div>
          <h3 className="semi-title">
            مراحل نصب و استفاده از برنامه اسپات پلیر
          </h3>

          <ol className="ol-wrapper">
            <li className="desc-item">
              با توجه به نوع دستگاه خود، برنامه را از طریق لینک‌‌های زیر نصب
              نمایید
            </li>
            <li className="desc-item">
              پس از باز کردن برنامه، بر روی گزینۀ <b>«باز کردن دوره جدید»</b>{" "}
              کلیک کنید
            </li>
            <li className="desc-item">
              کلید لایسنس دوره را در بخش <b>«License»</b> برنامه وارد کنید.
            </li>
            <li className="desc-item">
              با کلیک‌کردن بر روی دکمه پخش در هر جلسه، ویدیوی آن درس دانلود
              می‌شود و محتوا قابل استفاده خواهد بود.
            </li>
          </ol>
          <h3 className="semi-title">لطفاً نکات زیر را در نظر داشته باشید</h3>
          <ol className="ol-wrapper">
            <li>
              حد مجاز استفاده از کلید لایسنس، تا یک بار نصب برنامه می‌باشد.(کد
              یکبارمصرف )
            </li>
            <li>درصورت نیاز صدور مجدد کد هزینه برعهده خود دانش آموز میباشد</li>
            <li>
              اسپات پلیر بر روی دستگاه‌های زیر نصب نمی‌شود:
              <ul className="inside-ul">
                <li> اندروید پایین‌تر از نسخه‌ی 5</li>
                <li>ویندوز پایین‌تر از نسخه‌ی 7</li>
                <li>
                  سیستم عامل آیفون ios (اسپات پلیر به‌زودی برای این نوع سیستم هم
                  برنامه ارائه خواهد کرد)
                </li>
              </ul>
            </li>
          </ol>
          <h3 className="semi-title">آموزش تصویری</h3>
          <div className="visual-spot-guide">
            <a target="_blank" href={spot_guid_img_1}>
              <img
                src={spot_guid_img_1}
                alt="آموزش اسپات"
                className="spot-guide-img"
              />
            </a>
            <a target="_blank" href={spot_guid_img_2}>
              <img
                src={spot_guid_img_2}
                alt="آموزش اسپات"
                className="spot-guide-img"
              />
            </a>
            <a target="_blank" href={spot_guid_img_3}>
              <img
                src={spot_guid_img_3}
                alt="آموزش اسپات"
                className="spot-guide-img"
              />
            </a>
          </div>
        </section>
        <section className="download-links-box">
          <div className="box-header">
            <h2 className="box-title">لینک دانلود نرم افزار های مورد نیاز</h2>
          </div>
          <div className="links-wrapper">
            <div
              className="app-download-box"
              onClick={() => {
                set_open_links("spot");
              }}
            >
              لینک دانلود اسپات پلیر / spot player
            </div>
            {open_links === "spot" ? (
              <div className="download-links">
                <a
                  href="https://app.spotplayer.ir/assets/bin/spotplayer/setup.exe"
                  target="_blank"
                  className="os-link"
                >
                  Windows
                </a>
                <a
                  href="https://app.spotplayer.ir/assets/bin/spotplayer/setup.dmg"
                  target="_blank"
                  className="os-link"
                >
                  MacOS
                </a>
                <a
                  href="https://app.spotplayer.ir/assets/bin/spotplayer/setup.apk"
                  target="_blank"
                  className="os-link"
                >
                  Android
                </a>
              </div>
            ) : (
              <></>
            )}

            <div
              className="app-download-box"
              onClick={() => {
                set_open_links("chrome");
              }}
            >
              لینک دانلود کروم / Chrome
            </div>
            {open_links === "chrome" ? (
              <div className="download-links">
                <a
                  href="https://apps.apple.com/us/app/adobe-acrobat-reader-pdf-maker/id469337564"
                  target="_blank"
                  className="os-link"
                >
                  Windows
                </a>
                <a
                  href="https://soft98.ir/internet/web-browser/244-google-chrome-desktop.html"
                  target="_blank"
                  className="os-link"
                >
                  MacOS
                </a>
                <a
                  href="bazaar://details?id=com.android.chrome&ref=https%3A%2F%2Fwww.google.com%2F"
                  target="_blank"
                  className="os-link"
                >
                  Android
                </a>
                <a
                  href="https://apps.apple.com/us/app/google-chrome/id535886823"
                  target="_blank"
                  className="os-link"
                >
                  iOS
                </a>
              </div>
            ) : (
              <></>
            )}

            <div
              className="app-download-box"
              onClick={() => {
                set_open_links("any-desk");
              }}
            >
              لینک دانلود انی دسک / Any desk
            </div>
            {open_links === "any-desk" ? (
              <div className="download-links">
                <a
                  href="https://soft98.ir/internet/remote-control/15737-anydesk-download.html"
                  target="_blank"
                  className="os-link"
                >
                  Windows
                </a>
                <a
                  href="https://href.li/?https://play.google.com/store/apps/details?id=com.anydesk.anydeskandroid"
                  target="_blank"
                  className="os-link"
                >
                  MacOS
                </a>
                <a
                  href="https://href.li/?https://play.google.com/store/apps/details?id=com.anydesk.anydeskandroid"
                  target="_blank"
                  className="os-link"
                >
                  Android
                </a>
                <a
                  href="https://href.li/?https://itunes.apple.com/us/app/anydesk/id1176131273&mt=8"
                  target="_blank"
                  className="os-link"
                >
                  iOS
                </a>
              </div>
            ) : (
              <></>
            )}

            <div
              className="app-download-box"
              onClick={() => {
                set_open_links("pdf");
              }}
            >
              pdf لینک های دانلود
            </div>
            {open_links === "pdf" ? (
              <div className="download-links">
                <a
                  href="https://soft98.ir/software/pdf/338-adobe-reader-dc-download.html"
                  target="_blank"
                  className="os-link"
                >
                  Windows
                </a>
                <a
                  href="https://soft98.ir/software/pdf/2932-%D8%AF%D8%A7%D9%86%D9%80%D9%84%D9%88%D8%AF-%D8%A2%DA%A9%D8%B1%D9%88%D8%A8%D8%A7%D8%AA-%D8%B1%DB%8C%D8%AF%D8%B1-%D9%BE%D8%B1%D9%88.html"
                  target="_blank"
                  className="os-link"
                >
                  MacOS
                </a>
                <a
                  href="bazaar://details?id=com.adobe.reader&ref=https%3A%2F%2Fwww.google.com%2F"
                  target="_blank"
                  className="os-link"
                >
                  Android
                </a>
                <a
                  href="https://apps.apple.com/us/app/adobe-acrobat-reader-pdf-maker/id469337564"
                  target="_blank"
                  className="os-link"
                >
                  iOS
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default GuidePage;
