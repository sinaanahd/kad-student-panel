import React, { useContext, useEffect, useState } from "react";
import convert_to_persian from "../../../functions/convert-to-persian";
import LittleLoading from "../../../reuseables/little-loading";
import split_in_three from "../../../functions/spilit_in_three";
import axios from "axios";
import { DataContext } from "../../../data/datacontext";
import urls from "../../../urls/urls";
const InQeueItem = ({ iq }) => {
  const [pause, setPause] = useState(false);
  const { user } = useContext(DataContext);
  const pay_next_ghest = (pay_id) => {
    setPause(true);
    axios
      .get(
        `${urls.payment_link}${pay_id}`
        // `https://kadschool.com/backend/kad_api/payment_link2`
      )
      .then((res) => {
        // const payment_link = res.data;
        const { result, response, error } = res.data;
        // window.open(payment_link.link);
        if (result) {
          window.open(response);
        } else {
          alert("مشکلی پیش آمده ");
          console.log(error);
        }
        setPause(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <div className="next-pay-row">
      <span className="next-pay-item pay-first-col">
        {iq.products_ids.length
          ? convert_to_persian(iq.products_ids.length)
          : 0}{" "}
        کلاس
      </span>
      {/* <span className="next-pay-item need-bold">
        قسط {iq.is_ghesti ? convert_to_persian(iq.ghest_index) : "وارد نشده"}
      </span> */}
      <span className="next-pay-item">
        {split_in_three(convert_to_persian(iq.payment_amount))} تومان
      </span>
      <span className="next-pay-item">
        {iq.deadline_datetime
          ? new Date(iq.deadline_datetime).toLocaleDateString("fa-ir")
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
              pay_next_ghest(iq.payment_id);
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
