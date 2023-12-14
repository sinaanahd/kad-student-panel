import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DataContext } from "../data/datacontext";
import LittleLoading from "../reuseables/little-loading";
import split_in_three from "../functions/spilit_in_three";
import convert_to_persian from "../functions/convert-to-persian";
import Cart_item from "./cart-item/cart-item";
import axios from "axios";
import urls from "../urls/urls";
const CartPage = () => {
  const { user, cart } = useContext(DataContext);
  const [pay_option, set_pay_option] = useState(false);
  const [submit_pause, set_submit_pause] = useState(false);
  const [cash_pause, set_cash_pause] = useState(false);
  const [ghest_num, set_ghest_num] = useState(3);
  const [ghests, set_ghests] = useState(false);
  const [ghest_pause, set_ghest_pause] = useState(false);
  const [ghest_pay_pause, set_ghest_pay_pause] = useState(false);
  useEffect(() => {
    set_pay_option(false);
    set_ghests(false);
  }, [cart]);
  const get_naghd_link = () => {
    set_cash_pause(true);
    axios
      .get(`${urls.sale}${user.user_id}-0`)
      .then((res) => {
        // console.log(res.data);
        const { error, response, result } = res.data;
        if (result) {
          window.open(response);
        } else {
          alert(error);
        }
        set_cash_pause(false);
      })
      .catch((e) => {
        console.log(e.message);
        set_cash_pause(false);
      });
  };
  const get_ghest_link = () => {
    set_ghest_pay_pause(true);
    axios
      .get(`${urls.sale}${user.user_id}-3`)
      .then((res) => {
        // console.log(res.data);
        const { error, response, result } = res.data;
        if (result) {
          window.open(response);
        } else {
          alert(error);
        }
        set_ghest_pay_pause(false);
      })
      .catch((e) => {
        console.log(e.message);
        set_ghest_pay_pause(false);
      });
  };
  const calculate_ghest = () => {
    set_ghest_pause(true);
    axios
      .get(`${urls.ghest_details}${cart.final_price}-${ghest_num}`)
      .then((res) => {
        // console.log(res.data);
        const { error, response, result } = res.data;
        if (result) {
          set_ghests(response);
        } else {
          alert(error);
        }
        set_ghest_pause(false);
      })
      .catch((e) => {
        console.log(e.message);
        set_ghest_pause(false);
      });
  };
  const submit_cart = () => {
    const ids = { products_ids: cart.ids };
    if (cart.ids.length !== 0) {
      set_submit_pause(true);
      axios
        .patch(`${urls.buy_cart}${user.user_id}`, ids)
        .then((res) => {
          // console.log(res.data);
          const { error, response, result } = res.data;
          if (result) {
            if (response.products_ids.length !== cart.ids.length) {
              console.log("problem detected");
            } else {
              set_pay_option(true);
            }
          } else {
            alert(error);
          }
          set_submit_pause(false);
        })
        .catch((e) => {
          console.log(e.message);
          set_submit_pause(false);
        });
    } else {
      alert("سبد خرید شما خالی است");
    }
  };
  return (
    <>
      <Helmet>
        <title>سبد خرید</title>
      </Helmet>
      <div className="cart-page">
        <h1 className="title">سبد خرید</h1>
        <div className="cart-main-data">
          <section className="cart-items-part">
            <h2 className="semi-title">سبد خرید شما</h2>
            <div className="items-wrapper">
              {cart ? (
                cart.items.length !== 0 ? (
                  cart.items.map((k) => (
                    <Cart_item kelas={k} key={k.kelas_id} />
                  ))
                ) : (
                  "سبد خرید شما خالی است"
                )
              ) : (
                <LittleLoading />
              )}
            </div>
          </section>
          <div className="left-col">
            <section className="final-cart-data">
              <span className="final-data-item">
                <span className="item-title">قیمت کالا‌ها</span>
                <span className="item-num">
                  {split_in_three(
                    convert_to_persian(cart ? cart.pure_price : 0)
                  )}{" "}
                  تومان
                </span>
              </span>
              <span className="final-data-item">
                <span className="item-title">تخفیف</span>
                <span className="item-num">
                  {split_in_three(
                    convert_to_persian(cart ? cart.discounts : 0)
                  )}{" "}
                  تومان
                </span>
              </span>
              <span className="final-data-item sumation">
                <span className="item-title">جمع سبد خرید</span>
                <span className="item-num">
                  {split_in_three(
                    convert_to_persian(cart ? cart.final_price : 0)
                  )}{" "}
                  تومان
                </span>
              </span>
              {!submit_pause ? (
                <span className="sumbit-order-btn" onClick={submit_cart}>
                  ثبت سفارش
                </span>
              ) : (
                <span className="sumbit-order-btn">
                  <LittleLoading />
                </span>
              )}
            </section>
            {pay_option ? (
              <section className="final-cart-data">
                <h3 className="choose-title">نوع پرداخت خود را انتخاب کنید</h3>
                <span className="options">
                  {cash_pause ? (
                    <span className="option-btn">
                      <LittleLoading />
                    </span>
                  ) : (
                    <span className="option-btn" onClick={get_naghd_link}>
                      نقدی
                    </span>
                  )}
                  {ghest_pause ? (
                    <span className="option-btn">
                      <LittleLoading />
                    </span>
                  ) : (
                    <span className="option-btn" onClick={calculate_ghest}>
                      قسطی
                    </span>
                  )}
                </span>
                {ghests ? (
                  <>
                    <div className="all-ghests">
                      <span className="ghest-wrapper header-ghest">
                        <span className="ghest-num first-col">شماره </span>
                        <span className="ghest-num num-data">مبلغ </span>
                        <span className="ghest-num">تاریخ </span>
                      </span>
                      {ghests.map((g, i) => (
                        <span className="ghest-wrapper" key={i++}>
                          <span className="ghest-num first-col">
                            {convert_to_persian(i + 1)}
                          </span>
                          <span className="ghest-num num-data">
                            {split_in_three(convert_to_persian(g[0]))}{" "}
                            <span className="toman">تومان</span>
                          </span>
                          <span className="ghest-num">
                            {new Date(g[1]).toLocaleDateString("fa-ir")}
                          </span>
                        </span>
                      ))}
                      <span className="ghest-wrapper top-border"></span>
                    </div>
                    {ghest_pay_pause ? (
                      <span className="pay-in-ghesti-btn">
                        <LittleLoading />
                      </span>
                    ) : (
                      <span
                        className="pay-in-ghesti-btn"
                        onClick={get_ghest_link}
                      >
                        پرداخت اولین قسط
                      </span>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </section>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
