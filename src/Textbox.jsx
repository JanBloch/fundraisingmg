import React from "react";
import "./Textbox.css";
export const Textbox = ({ value, setValue, onKeyDown }) => {
  let valCache = "";
  const changeHandler = (e) => {
    const val = e.target.value;
    setValue(val, valCache);
    valCache = val;
  };
  return (
    <input
      className="input"
      type="text"
      value={value}
      onChange={changeHandler}
      onKeyDown={onKeyDown}
    />
  );
};
