import { DividedTaskDetails } from "../../types/interfaces";

export type ElementsTabProps = {
  tabHeaders: {
    label: string;
    value: string;
    data: DividedTaskDetails[];
  }[];
};
