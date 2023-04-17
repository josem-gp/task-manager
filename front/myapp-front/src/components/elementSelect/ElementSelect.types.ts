import {
  GroupDetails,
  DividedUserDetails,
} from "../../shared/general/interfaces";

export type TaskStatus = { id: "0"; name: "false" } | { id: "1"; name: "true" };

export type ElementSelectProps = {
  disabled?: boolean;
  name: string;
  elements: (GroupDetails | DividedUserDetails | TaskStatus)[] | null;
  elementId?: number;
  setElementId: (id: number) => void;
};
