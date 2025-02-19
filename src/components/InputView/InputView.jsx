import React from "react";
import { SearchableDropdown } from "../../SearchableDropdown";
import { useState } from "react";
import "./InputView.css";

export const InputView = ({ kunden, mitarbeiter, setDay }) => {
  const _clist = kunden.map((v, i) => ({ id: i, name: v }));
  const setValue = (makey, index, value) => {
    setDay(makey, index, value);
  };

  const getDayList = (makey, days) =>
    days.map((v, i) => (
      <SearchableDropdown
        options={_clist}
        label="name"
        id="id"
        selectedVal={v}
        handleChange={(val) => setValue(makey, i, val)}
        key={i}
      />
    ));
  const rows = Object.entries(mitarbeiter).map((v) => (
    <div className="row">
      <div style={{ width: 100, marginRight: 10 }}>{v[0]}</div>
      <div>{getDayList(v[0], v[1])}</div>
    </div>
  ));
  /*const saveToFile = () => {};
  const loadFromFile = () => {};
  <button onClick={saveToFile}>Speichern</button>
      <button onClick={loadFromFile}>Laden</button>*/
  return <div className="App">{rows}</div>;
};
