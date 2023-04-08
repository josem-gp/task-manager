import { GroupDetails, UserDetails } from "../../types/interfaces";

export type TaskStatus = { id: "0"; name: "false" } | { id: "1"; name: "true" };

export type ElementSelectProps = {
  name: string;
  elements: (GroupDetails | UserDetails | TaskStatus)[] | null;
  elementId?: string;
  setElementId: (id: string) => void;
};
