import { createContext } from "react";
import {
  Group,
  GroupDetails,
  InvitationDetails,
  TagDetails,
  DividedUserDetails,
  DividedTaskDetails,
} from "../../types/interfaces";

export const initialState: Group = {
  group: { id: 0, name: "", description: "", admin_id: 0 },
  groupUsers: [],
  groupTasks: [],
  groupTags: [],
  groupInvitations: [],
};

type GroupContextAction =
  | { type: "SET_GROUP"; payload: GroupDetails }
  | { type: "SET_GROUP_USERS"; payload: DividedUserDetails[] }
  | { type: "SET_GROUP_TASKS"; payload: DividedTaskDetails[] }
  | { type: "SET_GROUP_TAGS"; payload: TagDetails[] }
  | { type: "SET_GROUP_INVITATIONS"; payload: InvitationDetails[] };

export function reducer(state: Group, action: GroupContextAction) {
  switch (action.type) {
    case "SET_GROUP":
      return { ...state, group: action.payload };
    case "SET_GROUP_USERS":
      return { ...state, groupUsers: action.payload };
    case "SET_GROUP_TASKS":
      return { ...state, groupTasks: action.payload };
    case "SET_GROUP_TAGS":
      return { ...state, groupTags: action.payload };
    case "SET_GROUP_INVITATIONS":
      return { ...state, groupInvitations: action.payload };
    default:
      return state;
  }
}

type GroupContextType = {
  state: Group;
  dispatch: React.Dispatch<GroupContextAction>;
};

export const GroupContext = createContext({} as GroupContextType);
