import React, { useState } from "react";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import InQeueItem from "./inqeue-item/in-qeue-item";
const InPayQeue = ({ in_qeues }) => {
  return (
    <section className="wait-to-be-paid">
      <span className="wait-title">در انتظار پرداخت</span>
      <div className="next-pays-box">
        <div className="next-pay-header">
          <span className="next-pay-item pay-first-col">کلاس (ها)</span>
          {/* <span className="next-pay-item">شماره قسط</span> */}
          <span className="next-pay-item">میزان پرداختی</span>
          <span className="next-pay-item">موعد پرداخت</span>
          <span className="next-pay-item pay-last-col"></span>
        </div>
        {in_qeues.length !== 0
          ? in_qeues.map((iq, i) => <InQeueItem iq={iq} key={i++} />)
          : "موردی برای نمایش وجود ندارد"}
      </div>
    </section>
  );
};

export default InPayQeue;
