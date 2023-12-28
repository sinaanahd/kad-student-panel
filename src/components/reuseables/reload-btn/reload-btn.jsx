import React, { useState } from "react";
import { IoIosRefresh } from "react-icons/io";
const ReloadBtn = ({ additional_class, click }) => {
  return (
    <span className={"reload-btn-wrapper " + additional_class} onClick={click}>
      <IoIosRefresh />
      <span className="tool-tip">بارگذاری مجدد</span>
    </span>
  );
};

export default ReloadBtn;
