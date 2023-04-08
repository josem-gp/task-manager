import { DividedTaskDetails } from "../../types/interfaces";

export type CardProps = {
  type: "task" | "invitation" | "tag" | "user";
  element: DividedTaskDetails;
};

export type CardRendererProps = {
  element: DividedTaskDetails;
};
