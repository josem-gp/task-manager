import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { MyDatePickerProps } from "./MyDatePicker.types";
import { colors } from "../../utils/colors";

function MyDatePicker({
  value,
  disabled,
  label,
  setElement,
}: MyDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          disabled={disabled ? true : undefined}
          className="customDatePicker"
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(newValue: dayjs.Dayjs | null) => setElement(newValue)}
          sx={{
            flexGrow: 1,
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: `${colors.primary} !important`,
            },
            "& .Mui-focused": {
              color: `${colors.primary} !important`,
              fontWeight: "bold",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default MyDatePicker;
