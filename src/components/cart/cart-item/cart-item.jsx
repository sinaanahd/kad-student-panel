import React, { useContext, useState } from "react";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import { DataContext } from "../../data/datacontext";
const Cart_item = ({ kelas }) => {
  const { handle_cart } = useContext(DataContext);
  return (
    <div className="cart-item">
      <span className="img-wrapper-box">
        <img src={kelas.image_link} alt="" className="img-wrapper" />
      </span>
      <div className="wrap-responsive">
        <span className="class-name">{kelas.kelas_title}</span>
        <span className="teacher-name">
          استاد
          {kelas.kelas_title_and_ostad_name.split("استاد")[1].split("-")[0]}
        </span>
        <span className="prices">
          {kelas.discounted_price && kelas.discounted_price !== kelas.price ? (
            <>
              <span className="real-price">
                {split_in_three(convert_to_persian(kelas.price))} تومان
              </span>
              <span className="real-price">
                {split_in_three(convert_to_persian(kelas.discounted_price))}{" "}
                تومان
              </span>
            </>
          ) : (
            <>
              <span className="real-price">
                {split_in_three(convert_to_persian(kelas.price))} تومان
              </span>
            </>
          )}
        </span>
      </div>
      <span
        className="delete-from-cart"
        onClick={() => {
          handle_cart(kelas);
        }}
      >
        حذف از سبد خرید
      </span>
    </div>
  );
};

export default Cart_item;
