import { GroupDetails } from "../../types/interfaces";

export type ElementSelectProps = {
  elements: GroupDetails[] | null;
  elementId: string;
  setElementId: (id: string) => void;
};
