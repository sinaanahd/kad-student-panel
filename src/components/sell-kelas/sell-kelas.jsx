import React, { useContext, useEffect, useState } from "react";
import split_in_three from "../functions/spilit_in_three";
import convert_to_persian from "../functions/convert-to-persian";
import { DataContext } from "../data/datacontext";
const SellKelas = ({ kelas }) => {
  const { doreha, handle_cart, cart } = useContext(DataContext);

  return (
    <div className="sell-class-wrapper">
      <div className="right-contents">
        <a
          href={`https://kadschool.com/Shop/product/${kelas.kelas_title_and_ostad_name.replaceAll(
            " ",
            "-"
          )}`}
          target="_blank"
          className="kelas-img-link"
        >
          <img
            width={126}
            height={126}
            src={kelas.image_link}
            alt={kelas.kelas_title_and_ostad_name}
          />
        </a>
        <span className="dore-label">
          {doreha
            ? doreha.find((d) => d.dore_id === kelas.parent_dore_id).dore_title
            : ""}
        </span>
      </div>
      <div className="left-contents">
        <a
          href={`https://kadschool.com/Shop/product/${kelas.kelas_title_and_ostad_name.replaceAll(
            " ",
            "-"
          )}`}
          target="_blank"
          className="class-name"
        >
          {kelas.kelas_title}
        </a>
        {/* <span c></span> */}
        <span className="teachers-name">
          استاد{" "}
          {kelas.kelas_title_and_ostad_name.split("استاد")[1].split("-")[0]}
        </span>
        <div className="price-decieder">
          <span className="price-label">قیمت :</span>
          {kelas.discounted_price && kelas.discounted_price !== kelas.price ? (
            <>
              <span className="discount-price price-num">
                {split_in_three(convert_to_persian(kelas.price))}
                تومان
              </span>
              <span className="normal-price price-num">
                {split_in_three(convert_to_persian(kelas.discounted_price))}
                تومان
              </span>
            </>
          ) : (
            <>
              <span className="normal-price price-num">
                {split_in_three(convert_to_persian(kelas.price))}
                تومان
              </span>
              <span className="normal-price price-num"></span>
            </>
          )}
        </div>
        {cart ? (
          cart.ids.includes(kelas.kelas_id) ? (
            <span
              className="add-to-cart"
              onClick={() => {
                handle_cart(kelas);
              }}
            >
              حذف از سبد خرید
            </span>
          ) : (
            <span
              className="add-to-cart"
              onClick={() => {
                handle_cart(kelas);
              }}
            >
              افزودن به سبد خرید
            </span>
          )
        ) : (
          <span
            className="add-to-cart"
            onClick={() => {
              handle_cart(kelas);
            }}
          >
            افزودن به سبد خرید
          </span>
        )}
        {/* <span
          className="add-to-cart"
          onClick={() => {
            handle_cart(kelas);
          }}
        >
          افزودن به سبد خرید
        </span> */}
      </div>
    </div>
  );
};

export default SellKelas;
