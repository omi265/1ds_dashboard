import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import demo from "../demo-data.json";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const iconRender = (params) => {
  return (
    <div>
      <div>{params.value}</div>
      <div>
        <span>
          <i class="fa-duotone fa-check"></i>
        </span>
      </div>
    </div>
  );
};

function Table({ value }) {
  const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [total3, setTotal3] = useState(0);
  const [total4, setTotal4] = useState(0);

  const [gridApi, setGridApi] = useState();
  const data = React.useMemo(() => demo, []);
  let startDate = value.startDate;
  let endDate = value.endDate;
  // console.log(startDate, endDate);

  const getColumnDefs = () => {
    return [
      {
        headerName: "Target",
        field: "Target",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        cellStyle: { color: "#0d6efd" },
        minWidth: 200,
      },
      {
        field: "Bid",
        cellStyle: {
          "border-style": "solid",
          "border-color": "#0d6efd",
          "border-radius": "5px",
          width: "5rem",
        },
        // cellRenderer: iconRender,
        editable: true,
      },
      { field: "Bid Status", minWidth: 130 },

      {
        field: "Sales",
        aggFunc: (params) => {
          let sales_total = 0;
          params.values.forEach((value) => (sales_total += value));
          console.log(sales_total);
          setTotal1(sales_total);
          return sales_total;
        },
      },

      {
        field: "Spends",
        aggFunc: (params) => {
          let spends_total = 0;
          params.values.forEach((value) => (spends_total += value));
          console.log(spends_total);
          setTotal2(spends_total);
          return spends_total;
        },
      },

      {
        field: "CTR",
        aggFunc: (params) => {
          let ctr_total = 0;
          params.values.forEach((value) => (ctr_total += value));
          console.log(ctr_total);
          setTotal3(ctr_total);
          return ctr_total;
        },
      },

      {
        field: "ACoS",
        aggFunc: (params) => {
          let acos_total = 0;
          params.values.forEach((value) => {
            if (typeof value === "number") {
              acos_total += value;
            }
          });
          console.log(acos_total);
          setTotal4(acos_total);
          return acos_total;
        },
      },

      {
        field: "Creation Date",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: (dataFromFilter, cellValue) => {
            if (cellValue == null) {
              return 0;
            }
            const dateParts = cellValue.split("-");
            const day = Number(dateParts[2]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[0]);
            // console.log(day);
            const cellDate = new Date(year, month, day);
            if (cellDate < dataFromFilter) {
              return -1;
            } else if (cellDate > dataFromFilter) {
              return 1;
            }
            return 0;
          },
        },
      },
      { field: "Match Type" },
      { field: "Keyword Type" },
      { field: "Target Type" },
      { field: "Campaign" },
    ];
  };

  const defColumnDefs = {
    flex: 1,
    sortable: true,
    filter: true,
    minWidth: 150,
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  const [rowData] = useState([...data]);
  const [columnDefs, setColumnDefs] = useState(getColumnDefs());

  // const updateHeader = () => {
  //   const def = getColumnDefs();
  //   console.log(def[1].headerName);
  //   def[1].headerName = total1;
  //   def[2].headerName = total2;
  //   def[3].headerName = total3;
  //   def[4].headerName = total4;
  //   gridApi.api.setColumnDefs(def);
  // };

  useEffect(() => {
    if (gridApi && value) {
      var dateFilterComponent = gridApi.api.getFilterInstance("Creation Date");
      dateFilterComponent.setModel({
        type: "inRange",
        dateFrom: startDate,
        dateTo: endDate,
      });
      gridApi.api.onFilterChanged();
    }
  }, [value]);

  useEffect(() => {
    if (gridApi) {
      const model = gridApi.api.getFilterModel();
      console.log(model);
    }
  }, [gridApi]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end border-t">
        <div className="flex-1">
          <div className="bg-gray-300 rounded-full m-2 p-2 pl-4 pr-4 w-max">
            report_date = {startDate ? startDate : "None"} -{" "}
            {endDate ? endDate : "None"}
          </div>
        </div>
        <button
          className="m-2 p-2 text-blue-600 w-40"
          onClick={() => {
            gridApi.api.setFilterModel(null);
          }}
        >
          Reset Filters
        </button>
        <button
          className="bg-blue-600 m-2 p-2 text-white w-40"
          onClick={() => {
            alert("Your Actions have been saved");
          }}
        >
          Save Actions
        </button>
      </div>

      <div className="flex bg-gray-100">
        <div className="p-2 m-1 mr-96 font-bold">Total</div>
        <div className="p-2 m-1 ml-12 font-bold">
          {total1 ? total1.toFixed(2) : total1}
        </div>
        <div className="p-2 m-1 ml-12 font-bold">
          {total2 ? total2.toFixed(2) : total2}
        </div>
        <div className="p-2 m-1 ml-12 font-bold">
          {total3 ? total3.toFixed(2) : total3}
        </div>
        <div className="p-2 m-1 ml-16 font-bold">
          {total4 ? total4.toFixed(2) : total4}
        </div>
      </div>

      <div className="flex-1" style={{ height: "100%", width: "100%" }}>
        <div className="ag-theme-alpine" style={{ height: 750, width: 1700 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            sideBar={true}
            defaultColDef={defColumnDefs}
            animateRows={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default Table;
