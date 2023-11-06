import React, { useContext, useEffect, useState } from "react";
import convert_to_persian from "../../../functions/convert-to-persian";
import LittleLoading from "../../../reuseables/little-loading";
import split_in_three from "../../../functions/spilit_in_three";
import axios from "axios";
import { DataContext } from "../../../data/datacontext";
const InQeueItem = ({ iq }) => {
  const [pause, setPause] = useState(false);
  const { user } = useContext(DataContext);
  const pay_next_ghest = (num, pay_id) => {
    setPause(true);
    axios
      .get(
        `https://kadschool.com/backend/kad_api/payment_link/${user.user_id}-${num}-${pay_id}`
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
    <div className="next-pay-row">
      <span className="next-pay-item pay-first-col">
        {iq.kelases_ids.length ? convert_to_persian(iq.kelases_ids.length) : 0}{" "}
        کلاس
      </span>
      <span className="next-pay-item need-bold">
        قسط {iq.is_ghesti ? convert_to_persian(iq.ghest_index) : "وارد نشده"}
      </span>
      <span className="next-pay-item">
        {split_in_three(convert_to_persian(iq.price))} تومان
      </span>
      <span className="next-pay-item">
        {iq.pay_deadline
          ? new Date(iq.pay_deadline).toLocaleDateString("fa-ir")
          : "وارد نشده"}
      </span>
      <span className="next-pay-item pay-last-col">
        {pause ? (
          <span className="pay-ghest-btn">
            <LittleLoading />
          </span>
        ) : (
          <span
            className="pay-ghest-btn"
            onClick={() => {
              pay_next_ghest(iq.ghest_index, iq.pay_id);
            }}
          >
            پرداخت
          </span>
        )}
      </span>
    </div>
  );
};

export default InQeueItem;
