import { createContext } from "react";
import { DetailedGroup, Group } from "../../shared/group/interfaces";
import { TaskObject } from "../../shared/task/interfaces";
import { UserObject } from "../../shared/user/interfaces";
import { Tag } from "../../shared/tag/interfaces";
import { Invitation } from "../../shared/invitation/interfaces";

export const initialState: DetailedGroup = {
  group: { id: 0, name: "", description: "", admin_id: 0 },
  groupUsers: [],
  groupTasks: [],
  groupTags: [],
  groupInvitations: [],
};

export type GroupContextAction =
  | { type: "SET_GROUP"; payload: Group }
  | { type: "SET_GROUP_USERS"; payload: UserObject[] }
  | { type: "SET_GROUP_TASKS"; payload: TaskObject[] }
  | { type: "SET_GROUP_TAGS"; payload: Tag[] }
  | { type: "ADD_GROUP_TAG"; payload: Tag }
  | { type: "UPDATE_GROUP_TAG"; payload: Tag }
  | { type: "SET_GROUP_INVITATIONS"; payload: Invitation[] };

export function reducer(state: DetailedGroup, action: GroupContextAction) {
  switch (action.type) {
    case "SET_GROUP":
      return { ...state, group: action.payload };
    case "SET_GROUP_USERS":
      return { ...state, groupUsers: action.payload };
    case "SET_GROUP_TASKS":
      return { ...state, groupTasks: action.payload };
    case "SET_GROUP_TAGS":
      return { ...state, groupTags: action.payload };
    case "ADD_GROUP_TAG":
      return { ...state, groupTags: [...state.groupTags, action.payload] };
    case "UPDATE_GROUP_TAG":
      const updatedUserTags = state.groupTags.map((tag) => {
        if (tag.id === action.payload.id) {
          return action.payload;
        }
        return tag;
      });
      return { ...state, groupTags: updatedUserTags };
    case "SET_GROUP_INVITATIONS":
      return { ...state, groupInvitations: action.payload };
    default:
      return state;
  }
}

type GroupContextType = {
  state: DetailedGroup;
  dispatch: React.Dispatch<GroupContextAction>;
};

export const GroupContext = createContext({} as GroupContextType);
