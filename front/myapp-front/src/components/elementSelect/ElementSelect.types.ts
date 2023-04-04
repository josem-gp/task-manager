import { GroupDetails } from "../../types/interfaces";

export type ElementSelectProps = {
  name: string;
  elements: GroupDetails[] | null;
  elementId: string;
  setElementId: (id: string) => void;
};
