import React, { useContext, useState } from "react";
import convert_to_persian from "../../functions/convert-to-persian";
import spilit_in_three from "../../functions/spilit_in_three";
import { DataContext } from "../../data/datacontext";
const Factor = ({ factor }) => {
  const { kelasses } = useContext(DataContext);
  const [kelas_names, set_kelas_names] = useState(false);
  const kelas_names_data = kelasses.filter((k) =>
    factor.kelases_ids.includes(k.kelas_id)
  );
  return (
    <>
      <div className="factor-row">
        <span
          className="factor-item first-col cursor-need"
          onClick={() => {
            set_kelas_names(!kelas_names);
          }}
        >
          {factor.kelases_ids.length
            ? convert_to_persian(factor.kelases_ids.length)
            : 0}{" "}
          کلاس
        </span>
        <span className="factor-item need-bold">
          {factor.is_ghesti ? "قسطی" : "نقدی"}
        </span>
        <span className="factor-item">
          {spilit_in_three(convert_to_persian(factor.price))} تومان
        </span>
        <span className="factor-item">
          {factor.pay_date ? (
            <>
              <span className="inside-item">
                {new Date(factor.pay_date).toLocaleDateString("fa-ir")}
              </span>
              <span className="inside-item">
                {factor.pay_date.split("T")[1].split(".")[0].replace("Z", "")}
              </span>
            </>
          ) : (
            <span className="inside-item need-bold">پرداخت نشده</span>
          )}
        </span>
        <span className="factor-item last-col">
          <span className="show-detials-btn">مشاهده جزئیات</span>
        </span>
      </div>
      {kelas_names ? (
        <div className="kelas-names">
          {kelas_names_data.map((k) => (
            <div className="kelas-name" key={k.kelas_id}>
              {k.kelas_title_and_ostad_name}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Factor;
