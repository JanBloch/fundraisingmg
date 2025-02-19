import "./App.css";
import { useState } from "react";
import { InputView } from "./components/InputView/InputView";
import { ListEntry } from "./ListEntry";
import { LinkButton } from "./components/LinkButton/LinkButton";
import { csvToArray } from "./csvToArray";
import { DatePicker } from "./components/DatePicker/DatePicker";
import { Box } from "./components/Box/Box";
import { Button } from './components/Button/Button';
import { getEinsatzPlan } from "./components/InputView/getEinsatzPlan";
import { generateContracts } from "./generateContracts";

function App() {
  const dayCount = 5;
  const [maData, setMaData] = useState({});
  //const [kunden, setKunden] = useState([]);
  const [stammdaten, setStammdaten] = useState([]);
  const [startDate, setStartDate] = useState();
  const [einsatzPlan, setEinsatzPlan] = useState(null);
  const [einsatzvertragTemplate, setEinsatzvertragTemplate] = useState(null);
  const [verleihvertragTemplate, setVerleihvertragTemplate] = useState(null);
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
    readFileAsText(file).then(result => {
      const arr = csvToArray(result);
      setStammdaten(arr);
    })
  };
  const readFileAsText = async (file) => {
    if (!file) return;
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    return new Promise((resolve) => {
      reader.onload = function (evt) {
        resolve(evt.target.result);
      };
    })
  }
  const readFile = async (file) => {
    if (!file) return;
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    return new Promise((resolve) => {
      reader.onload = function (evt) {
        resolve(evt.target.result);
      };
    })
  }
  const uploadEinsatzvertragTemplate = async (file) => {
    const content = await readFile(file);
    setEinsatzvertragTemplate(content);
  };
  const uploadVerleihvertragTemplate = async (file) => {
    const content = await readFile(file);
    setVerleihvertragTemplate(content);
  };
  const kunden = stammdaten.map((v) => v["Wo"]);
  const createEinsatzplan = () => {
    setEinsatzPlan(getEinsatzPlan(startDate, maData));
  };
  const e_generateContracts = () => {
    try {
      generateContracts(einsatzvertragTemplate, verleihvertragTemplate, einsatzPlan, stammdaten);
    } catch (ex) {
      alert(ex);
    }
  };
  console.log(kunden);
  //<ListEntry list={kunden} addToList={addKunde}></ListEntry>
  return (
    <div>
      <div className="grid-parent customerlist">
        <div>
          <Box>
            <LinkButton
              href={downloadString}
              download="output.json"
              text="Download JSON"
            />
          </Box>
          <Box>
            <input
              type="file"
              onChange={(e) => uploadStammdaten(e.target.files[0])}
            />
          </Box>
          <Box>
            <div>
              <span className="label">Startdatum</span>
              <DatePicker value={startDate} setValue={setStartDate} />
            </div>
            <Button label="Einsatzplan generieren" onClick={createEinsatzplan} />
          </Box>
          <Box>
            <div>
              <span className="label">Einsatzvertrag Vorlage</span>
              <input type="file" onChange={(e) => uploadEinsatzvertragTemplate(e.target.files[0])}></input>
            </div>
            <div>
              <span className="label">Verleihvertrag Vorlage</span>
              <input type="file" onChange={(e) => uploadVerleihvertragTemplate(e.target.files[0])}></input>
            </div>
          </Box>
          <Box>
            <Button label="Verträge generieren" onClick={e_generateContracts} />
          </Box>
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
        <div style={{ height: 120 }}></div>
      </div>
    </div>
  );
}

export default App;
