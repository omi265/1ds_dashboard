import React from "react";

function DropDown() {
  return (
    <div>
      <div className="pt-3.5">
        <select className="h-8 border border-slate-700 p-1 rounded-md">
          <option value="client">Client Name</option>
          <option value="client1">Client Name 1</option>
          <option value="client2">Client Name 2</option>
        </select>
      </div>
    </div>
  );
}

export default DropDown;
