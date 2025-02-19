import React from "react";

export const DatePicker = ({ ...props }) => {
  return (
    <input
      type="date"
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
};
