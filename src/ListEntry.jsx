import React, { useState } from "react";
import { Textbox } from "./Textbox";
import { Label } from "./Label";

export const ListEntry = ({ list, addToList, updateList }) => {
  const [newVal, setNewVal] = useState("");
  const addVal = () => {
    addToList(newVal);
    setNewVal("");
  };
  const lCopy = [...list].reverse();
  return (
    <div>
      <Textbox
        value={newVal}
        setValue={setNewVal}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            addVal();
          }
        }}
      />
      <button onClick={addVal}>Add</button>
      {lCopy.map((v, i) => (
        <Label text={v} />
      ))}
    </div>
  );
};
