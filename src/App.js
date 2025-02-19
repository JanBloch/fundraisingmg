import "./App.css";
import { SearchableDropdown } from "./SearchableDropdown";
import { useState } from "react";
import { InputView } from "./InputView";
import { ListEntry } from "./ListEntry";
import { LinkButton } from "./components/LinkButton/LinkButton";
import { Button } from "./components/Button/Button";
import { csvToArray } from "./csvToArray";
import { DatePicker } from "./components/DatePicker/DatePicker";

function App() {
  const dayCount = 5;
  const [maData, setMaData] = useState({});
  //const [kunden, setKunden] = useState([]);
  const [stammdaten, setStammdaten] = useState([]);
  const [startDate, setStartDate] = useState();
  /*const setKunde = (index, value) => {
    const newList = [...kunden];
    newList[index] = value;
    setKunden(newList);
  };*/

  const setMitarbeiterName = (name, newName) => {
    maData[newName] = maData[name];
    delete maData[name];
  };
  const addNewMitarbeiter = (name) => {
    const newData = { ...maData };
    newData[name] = "a"
      .repeat(dayCount * 2)
      .split("")
      .map((v) => "");
    setMaData(newData);
  };

  /*const addKunde = (kunde) => {
    const newList = [...kunden];
    newList.push(kunde);
    setKunden(newList);
  };*/
  const downloadString = `data:text/plain;charset=utf-8,${encodeURIComponent(
    JSON.stringify(maData)
  )}`;
  const uploadStammdaten = (file) => {
    if (!file) return;
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      //console.log(evt.target.result);
      const arr = csvToArray(evt.target.result);
      //console.log(arr);
      setStammdaten(arr);
      //document.getElementById("fileContents").innerHTML = evt.target.result;
    };
  };
  const kunden = stammdaten.map((v) => v["Wo?"]);
  console.log(kunden);
  //<ListEntry list={kunden} addToList={addKunde}></ListEntry>
  return (
    <div>
      <div className="grid-parent customerlist">
        <div>
          <div>
            <LinkButton
              href={downloadString}
              download="output.json"
              text="Download JSON"
            />
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => uploadStammdaten(e.target.files[0])}
            />
          </div>
          <div>
            <DatePicker value={startDate} setValue={setStartDate} />
          </div>
        </div>
        <ListEntry
          list={Object.keys(maData)}
          addToList={addNewMitarbeiter}
          updateList={(index, value, oldValue) =>
            setMitarbeiterName(oldValue, value)
          }
        />
        <InputView
          kunden={kunden}
          mitarbeiter={maData}
          setDay={(makey, day, value) => {
            const ma = maData[makey];
            ma[day] = value;
            const obj = { ...maData };
            obj[makey] = ma;
            setMaData(obj);
          }}
        />
      </div>
    </div>
  );
}

export default App;
