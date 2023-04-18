import { Group } from "../../shared/group/interfaces";
import { UserObject } from "../../shared/user/interfaces";

export type TaskStatus = { id: 0; name: "false" } | { id: 1; name: "true" };

export type ElementSelectProps = {
  disabled?: boolean;
  name: string;
  elements: (Group | UserObject | TaskStatus)[] | null;
  elementId?: number | null;
  setElementId: (id: number) => void;
};
