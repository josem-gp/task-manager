import dayjs from "dayjs";
import { FilterBarParams } from "../../types/interfaces";

export interface MyDatePickerProps {
  state: FilterBarParams;
  label: string;
  value: string | null;
  fontColor: string;
  borderColor: string;
  setElement: (newValue: dayjs.Dayjs | null) => void;
}
