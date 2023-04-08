import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { MyDatePickerProps } from "./MyDatePicker.types";

function MyDatePicker({
  state,
  label,
  borderColor,
  fontColor,
  setElement,
}: MyDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          className="customDatePicker"
          label={label}
          value={state.to_due_date ? dayjs(state.to_due_date) : null}
          onChange={(newValue: dayjs.Dayjs | null) => setElement(newValue)}
          sx={{
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: `${borderColor} !important`,
            },
            "& .Mui-focused": {
              color: `${fontColor} !important`,
              fontWeight: "bold",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default MyDatePicker;
