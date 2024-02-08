import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import scrollToTop from "../functions/scroll";
import img1 from "../../asset/images/wallet/wallet-img-3.webp";
import img2 from "../../asset/images/wallet/wallet-img-1.webp";
import img3 from "../../asset/images/wallet/wallet-img-2.webp";
import convert_to_persian from "../functions/convert-to-persian";
import split_in_three from "../functions/spilit_in_three";
import { DataContext } from "../data/datacontext";
const Wallet = () => {
  const { user } = useContext(DataContext);
  const calculate_balance = (transactions) => {
    let sum = 0;
    transactions.forEach((t) => {
      sum += t.amount;
    });
    return sum;
  };
  return (
    <>
      <Helmet>
        <title>پنل دانش آموزان | کیف پول </title>
        <meta
          name="keywords"
          content="کیف پول کاد, جایزه ثبت نام, تخفیف کاد, مسابقه, جایزه ثبت نام کاد,"
        />
        <meta
          name="description"
          content="
            ما توی کاد یه قابلیت جدید اضافه کردیم به اسم کیف پول و براتون کلی
            جایزه آماده کردیم. اینجا کلی تخفیف و جایزه داریم که منتظر شما دانش
            آموزای خوب کاد هستن.از مسابقه و جشنواره تا نگه داشتن مبلغ خریدتون توی کیف پول."
        />
      </Helmet>
      <div className="wallet-page">
        <section className="page-intro mm-width">
          {/* <h1 className="page-title font-bold">کیف پول کاد</h1> */}
          <p className="page-main-text">
            دوست خوب کادی سلام
            <br />
            ما توی کاد یه قابلیت جدید اضافه کردیم به اسم کیف پول و براتون کلی
            جایزه آماده کردیم. اینجا کلی تخفیف و جایزه داریم که منتظر شما دانش
            آموزای خوب کاد هستن. <br />
            از مسابقه و جشنواره تا نگه داشتن مبلغ خریدتون توی کیف پول.
          </p>
        </section>
        {user ? (
          <section className="show-user-transaction mm-width">
            <h2 className="semi-title font-bold">تراکنش های شما</h2>
            <div className="transaction-table">
              <div className="transaction-table-header font-bold">
                <span className="transaction-header-item">تاریخ تراکنش</span>
                <span className="transaction-header-item">مبلغ</span>
                <span className="transaction-header-item">توضیحات تراکنش</span>
              </div>
              {user.transactions.map((t, i) => (
                <div key={i++} className={"transaction-table-row"}>
                  <span
                    className={
                      t.amount >= 0
                        ? "amount-label-decider green"
                        : "amount-label-decider red"
                    }
                  >
                    {t.amount >= 0 ? "+" : "-"}
                  </span>
                  <span className="transaction-item">
                    {new Date(t.datetime).toLocaleDateString("fa-ir")}
                  </span>
                  <span className="transaction-item">
                    {t.amount >= 0
                      ? split_in_three(convert_to_persian(Math.ceil(t.amount)))
                      : split_in_three(
                          convert_to_persian(Math.ceil(-t.amount))
                        )}{" "}
                    تومان
                  </span>
                  <span className="transaction-item">{t.description}</span>
                </div>
              ))}
            </div>
            <div className="balance-wrapper">
              <span className="label-for-balance font-bold">موجودی شما : </span>
              <span className="total-balance">
                {split_in_three(
                  convert_to_persian(calculate_balance(user.transactions))
                )}{" "}
                تومان
              </span>
            </div>
            <Link
              to="/Shop"
              className="font-bold go-to-shop-link"
              onClick={scrollToTop}
            >
              پیش به سوی فروشگاه
            </Link>
          </section>
        ) : (
          <></>
        )}

        <section className="reason-text mm-width">
          <div className="text-content">
            <h2 className="semi-title font-bold">هدیه کیف پول چیه ؟</h2>
            <p className="desc-text">
              برای دانش آموزان قدیمی و جدید کاد به عنوان جایزه ۱۰۰/۰۰۰ هزار
              تومان اعتبار هدیه همراهی با کاد قرار دادیم که به راحتی میتونی
              باهاش از{" "}
              <Link
                to="/Shop"
                className="font-bold"
                onClick={() => {
                  scrollToTop();
                }}
              >
                فروشگاهمون
              </Link>{" "}
              خرید کنید.
              <br />
              اگه از قبل ثبت نام کرده باشی که این اعتبار توی کیف پولت هست و
              میتونی ازش استفاده کنی. اما اگه هنوز افتخار همراهی شمارو نداشتیم
              اصلا نگران نباش چون فاصله‌ات برای این دریافت هدیه فقط یک ثبت نام{" "}
              توی سایت کاد است.
            </p>
          </div>
          <div className="img-place">
            <img
              src={img1}
              alt="هدیه کیف پول کاد"
              width={400}
              height={400}
              loading="lazy"
            />
          </div>
        </section>
        <section className="reason-text reverse mm-width">
          <div className="img-place">
            <img
              src={img2}
              alt="کلاس های جایزه دار کاد"
              width={400}
              height={400}
              loading="lazy"
            />
          </div>
          <div className="text-content">
            <h2 className="semi-title font-bold">
              کلاس های جایزه دار چه کلاس هایی هستن ؟
            </h2>
            <p className="desc-text">
              تمامی کلاس های کاد برای شما کلاس جایزه دارن. فقط کافیه کلاس های
              مورد نظر خودت از بین کلاس های کاد انتخاب کنی و برای خرید بعدیت ۱۰
              درصد مبلغ پرداختیت بمونه توی کیف پولت.
              <br />
              با سر زدن به{" "}
              <Link to="/Shop" className="font-bold" onClick={scrollToTop}>
                فروشگاه کاد
              </Link>{" "}
              و انتخاب کلاس هایی که میخوای از الان ۱۰ درصد مبلغ خریدتو برای خودت
              پس انداز کن.
            </p>
          </div>
        </section>
        <section className="reason-text mm-width">
          <div className="text-content">
            <h2 className="semi-title font-bold">
              با کیف پول کاد مسابقه هم برگزار میشه ؟
            </h2>
            <p className="desc-text">
              کیف پول یه مسابقه جذاب و هیجان انگیز داره که با جواب دادن به
              سوالاش میتونی یه اعتبار به کیف پولتون اضافه کنید و هر کلاسی رو که
              بخواید با تخفیف بیشتر بخرید.
              <br />
              مسابقه به زودی راه میوفته پس سعی کن به سایت ما همیشه سر بزنی که
              وقتی شروع شد از کلی جایزه و هدیه جا نمونی !
            </p>
          </div>
          <div className="img-place">
            <img
              src={img3}
              alt="مسابقه کاد"
              loading="lazy"
              width={400}
              height={271}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Wallet;
