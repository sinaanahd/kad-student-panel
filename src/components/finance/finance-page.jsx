import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import LittleLoading from "../reuseables/little-loading";
import Factor from "./factor/factor";
import InPayQeue from "./in-pay-qeue/in-pay-qeue";
import Debt from "./debt-box/debt";
const FinancePage = () => {
  const { user, pay_info, get_info } = useContext(DataContext);
  const in_qeues = pay_info
    ? pay_info.filter((pi) => !pi.pay_date).reverse()
    : [];
  const check_total_debt = (arr) => {
    let sum = 0;
    if (arr.length !== 0) {
      arr.forEach((item) => {
        sum += item.price;
      });
    }
    return sum;
  };
  useEffect(() => {
    if (user) {
      get_info(user.user_id);
    }
  }, []);
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
          {pay_info ? (
            pay_info.length !== 0 ? (
              pay_info.map((p, i) => <Factor key={i++} factor={p} />)
            ) : (
              "موردی برای نمایش وجود ندارد"
            )
          ) : (
            <LittleLoading />
          )}
        </section>
        <div className="second-row">
          <Debt in_qeues={in_qeues} />
          <InPayQeue in_qeues={in_qeues} />
        </div>
      </div>
    </>
  );
};

export default FinancePage;
