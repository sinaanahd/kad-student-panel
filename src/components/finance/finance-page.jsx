import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import LittleLoading from "../reuseables/little-loading";
import spilit_in_three from "../functions/spilit_in_three";
import convert_to_persian from "../functions/convert-to-persian";
const FinancePage = () => {
  return (
    <>
      <Helmet>
        <title>امور مالی</title>
      </Helmet>
      <div className="finance-page-wrapper">
        <section className="factors-part">
          <div className="factor-header">
            <span className="factor-item first-col">کلاس (ها)</span>
            <span className="factor-item">نوع و وضعیت پرداخت</span>
            <span className="factor-item">میزان پرداختی</span>
            <span className="factor-item">تایخ و زمان آخرین پرداخت</span>
            <span className="factor-item last-col"></span>
          </div>
          <div className="factor-row">
            <span className="factor-item first-col">ریاضی دهم</span>
            <span className="factor-item">نقدی</span>
            <span className="factor-item">
              {spilit_in_three(convert_to_persian(12000000))} تومان
            </span>
            <span className="factor-item">
              <span className="inside-item">۱۴۰۲/۰۹/۱۸</span>
              <span className="inside-item">۱۳:۲۳:۱۲</span>
            </span>
            <span className="factor-item last-col">
              <span className="show-detials-btn">مشاهده جزئیات</span>
            </span>
          </div>
          <div className="factor-row">
            <span className="factor-item first-col">ریاضی دهم</span>
            <span className="factor-item">نقدی</span>
            <span className="factor-item">
              {spilit_in_three(convert_to_persian(12000000))} تومان
            </span>
            <span className="factor-item">
              <span className="inside-item">۱۴۰۲/۰۹/۱۸</span>
              <span className="inside-item">۱۳:۲۳:۱۲</span>
            </span>
            <span className="factor-item last-col">
              <span className="show-detials-btn">مشاهده جزئیات</span>
            </span>
          </div>
          <div className="factor-row">
            <span className="factor-item first-col">ریاضی دهم</span>
            <span className="factor-item">نقدی</span>
            <span className="factor-item">
              {spilit_in_three(convert_to_persian(12000000))} تومان
            </span>
            <span className="factor-item">
              <span className="inside-item">۱۴۰۲/۰۹/۱۸</span>
              <span className="inside-item">۱۳:۲۳:۱۲</span>
            </span>
            <span className="factor-item last-col">
              <span className="show-detials-btn">مشاهده جزئیات</span>
            </span>
          </div>
        </section>
        <div className="second-row">
          <section className="total-pay-amount">
            <span className="total-title">میزان بدهی</span>
            <span className="total-amount">
              <span className="num">
                {spilit_in_three(convert_to_persian(120000000))}
              </span>
              <span className="currency">تومان</span>
            </span>
            <span className="pay-all-bills-btn">تسویه حساب</span>
          </section>
          <section className="wait-to-be-paid">
            <span className="wait-title">در انتظار پرداخت</span>
            <div className="next-pays-box">
              <div className="next-pay-header">
                <span className="next-pay-item pay-first-col">کلاس (ها)</span>
                <span className="next-pay-item">شماره قسط</span>
                <span className="next-pay-item">میزان پرداختی</span>
                <span className="next-pay-item">موعد پرداخت</span>
                <span className="next-pay-item pay-last-col"></span>
              </div>
              <div className="next-pay-row">
                <span className="next-pay-item pay-first-col">
                  فلسفه و منطق
                </span>
                <span className="next-pay-item">قسط سوم</span>
                <span className="next-pay-item">
                  {spilit_in_three(convert_to_persian(120000))} تومان
                </span>
                <span className="next-pay-item">۱۴۰۲/۰۹/۱۸</span>
                <span className="next-pay-item pay-last-col">
                  <span className="pay-ghest-btn">پرداخت</span>
                </span>
              </div>
              <div className="next-pay-row">
                <span className="next-pay-item pay-first-col">
                  فلسفه و منطق
                </span>
                <span className="next-pay-item">قسط سوم</span>
                <span className="next-pay-item">
                  {spilit_in_three(convert_to_persian(120000))} تومان
                </span>
                <span className="next-pay-item">۱۴۰۲/۰۹/۱۸</span>
                <span className="next-pay-item pay-last-col">
                  <span className="pay-ghest-btn">پرداخت</span>
                </span>
              </div>
              <div className="next-pay-row">
                <span className="next-pay-item pay-first-col">
                  فلسفه و منطق
                </span>
                <span className="next-pay-item">قسط سوم</span>
                <span className="next-pay-item">
                  {spilit_in_three(convert_to_persian(120000))} تومان
                </span>
                <span className="next-pay-item">۱۴۰۲/۰۹/۱۸</span>
                <span className="next-pay-item pay-last-col">
                  <span className="pay-ghest-btn">پرداخت</span>
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FinancePage;
