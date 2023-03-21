import { useState } from "react";
import "./App.css";
import DatePicker from "./components/DatePicker";
import DropDown from "./components/DropDown";
import SideBar from "./components/SideBar";
import Table from "./components/Table";

function App() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log(value);
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <div className="App">
      <div className="flex w-screen">
        <SideBar />
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="text text-3xl font-semibold p-3">
              Performance Overview
            </h1>
            <div className="flex">
              <DropDown />
              <div className="pt-2.5 ml-4">
                <DatePicker handleValueChange={handleValueChange} />
              </div>
            </div>
          </div>

          <div>
            <Table value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
