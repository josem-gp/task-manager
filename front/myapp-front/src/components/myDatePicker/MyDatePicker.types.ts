import dayjs from "dayjs";
import { FilterBarParams } from "../filterBar/FilterBar.types";

export interface MyDatePickerProps {
  state: FilterBarParams;
  label: string;
  fontColor: string;
  borderColor: string;
  setElement: (newValue: dayjs.Dayjs | null) => void;
}