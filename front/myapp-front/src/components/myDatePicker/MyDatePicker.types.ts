import dayjs from "dayjs";

export interface MyDatePickerProps {
  disabled?: boolean;
  label: string;
  value: string | null;
  setElement: (newValue: dayjs.Dayjs | null) => void;
}
