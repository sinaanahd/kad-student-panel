import React, { useState, useContext } from "react";
import axios from "axios";
import LittleLoading from "../../reuseables/little-loading";
import spilit_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import { DataContext } from "../../data/datacontext";
const check_total_debt = (arr) => {
  let sum = 0;
  if (arr.length !== 0) {
    arr.forEach((item) => {
      sum += item.price;
    });
  }
  return sum;
};
const Debt = ({ in_qeues }) => {
  const { user } = useContext(DataContext);
  const [pause, setPause] = useState(false);
  const pay_next_ghest = () => {
    setPause(true);
    const next_pay = in_qeues[0];
    axios
      .get(
        `https://kadschool.com/backend/kad_api/payment_link/${user.user_id}-${next_pay.ghest_index}-${next_pay.pay_id}`
        // `https://kadschool.com/backend/kad_api/payment_link2`
      )
      .then((res) => {
        const payment_link = res.data;
        // console.log(payment_link);
        window.open(payment_link.link);
        setPause(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <section className="total-pay-amount">
      <span className="total-title">میزان بدهی</span>
      <span className="total-amount">
        <span className="num">
          {spilit_in_three(convert_to_persian(check_total_debt(in_qeues)))}
        </span>
        <span className="currency">تومان</span>
      </span>
      {in_qeues.length === 0 ? (
        <></>
      ) : pause ? (
        <span className="pay-all-bills-btn">
          <LittleLoading />
        </span>
      ) : (
        <span
          className="pay-all-bills-btn"
          onClick={() => {
            pay_next_ghest();
          }}
        >
          پرداخت قسط بعدی
        </span>
      )}
    </section>
  );
};

export default Debt;
