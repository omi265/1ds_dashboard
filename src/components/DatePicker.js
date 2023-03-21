import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

function DatePicker({ handleValueChange }) {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange1 = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    handleValueChange(newValue);
  };

  return (
    <Datepicker
      primaryColor={"white"}
      value={value}
      onChange={handleValueChange1}
      showShortcuts={true}
    />
  );
}
export default DatePicker;
