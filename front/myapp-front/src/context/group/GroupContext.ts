import { createContext } from "react";
import {
  DividedTasks,
  Group,
  GroupDetails,
  InvitationDetails,
  TagDetails,
  UserDetails,
} from "../../types/interfaces";

export const initialState: Group = {
  group: null,
  groupUsers: null,
  groupTasks: null,
  groupTags: null,
  groupInvitations: null,
};

type GroupContextAction =
  | { type: "SET_GROUP"; payload: GroupDetails | null }
  | { type: "SET_GROUP_USERS"; payload: UserDetails[] | null }
  | { type: "SET_GROUP_TASKS"; payload: DividedTasks | null }
  | { type: "SET_GROUP_TAGS"; payload: TagDetails[] | null }
  | { type: "SET_GROUP_INVITATIONS"; payload: InvitationDetails[] | null };

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
