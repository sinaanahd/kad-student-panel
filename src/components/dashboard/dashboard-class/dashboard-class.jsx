import React, { useContext, useState } from "react";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import { DataContext } from "../../data/datacontext";
const DashboardClass = ({ kelas }) => {
  const { doreha } = useContext(DataContext);
  return (
    <div className="class-wrapper">
      <div className="right-contents">
        <img
          width={126}
          height={126}
          src={kelas.image_link}
          alt={kelas.kelas_title_and_ostad_name}
        />
        <span className="dore-label">
          {doreha
            ? doreha.find((d) => d.dore_id === kelas.parent_dore_id).dore_title
            : ""}
        </span>
      </div>
      <div className="left-contents">
        <span className="class-name">{kelas.kelas_title}</span>
        <span className="teachers-name">
          استاد {kelas.kelas_title_and_ostad_name.split("استاد")[1]}
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
            <span className="normal-price price-num">
              {split_in_three(convert_to_persian(kelas.price))}
              تومان
            </span>
          )}
        </div>
        <span className="add-to-cart">افزودن به سبد خرید</span>
      </div>
    </div>
  );
};

export default DashboardClass;
