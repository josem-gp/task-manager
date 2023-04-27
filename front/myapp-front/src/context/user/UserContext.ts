import { createContext } from "react";
import { DetailedUser, UserObject } from "../../shared/user/interfaces";
import { Group } from "../../shared/group/interfaces";
import { TaskObject } from "../../shared/task/interfaces";
import { Icon } from "../../shared/icon/interfaces";

export const initialState: DetailedUser = {
  userObject: {
    user: { id: 0, username: "", email: "", icon_id: 0 },
    user_icon: { id: 0, name: "", url: "" },
  },
  userGroups: [],
  userTasks: [],
  allIcons: [],
  userAuth: "",
};

export type UserContextAction =
  | { type: "SET_USER"; payload: UserObject }
  | { type: "UPDATE_USER"; payload: UserObject }
  | { type: "SET_ALL_ICONS"; payload: Icon[] }
  | { type: "SET_USER_GROUPS"; payload: Group[] }
  | { type: "ADD_USER_GROUP"; payload: Group }
  | { type: "REMOVE_USER_GROUP"; payload: number }
  | { type: "UPDATE_USER_GROUP"; payload: Group }
  | { type: "SET_USER_TASKS"; payload: TaskObject[] }
  | { type: "ADD_USER_TASK"; payload: TaskObject }
  | { type: "REMOVE_USER_TASK"; payload: number }
  | { type: "UPDATE_USER_TASK"; payload: TaskObject }
  | { type: "SET_USER_AUTH"; payload: string }
  | { type: "RESET_USER_CONTEXT" };

export function reducer(state: DetailedUser, action: UserContextAction) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userObject: action.payload };
    case "UPDATE_USER":
      return { ...state, userObject: action.payload };
    case "SET_ALL_ICONS":
      return { ...state, allIcons: action.payload };
    case "SET_USER_GROUPS":
      return { ...state, userGroups: action.payload };
    case "ADD_USER_GROUP":
      return { ...state, userGroups: [...state.userGroups, action.payload] };
    case "REMOVE_USER_GROUP":
      const updatedGroups = state.userGroups.filter((group) => {
        return group.id !== action.payload;
      });
      return { ...state, userGroups: updatedGroups };
    case "UPDATE_USER_GROUP":
      const updatedUserGroups = state.userGroups.map((group) => {
        if (group.id === action.payload.id) {
          return action.payload;
        }
        return group;
      });
      return { ...state, userGroups: updatedUserGroups };
    case "SET_USER_TASKS":
      return { ...state, userTasks: action.payload };
    case "ADD_USER_TASK":
      return { ...state, userTasks: [...state.userTasks, action.payload] };
    case "REMOVE_USER_TASK":
      const updatedTasks = state.userTasks.filter((task) => {
        return task.task.id !== action.payload;
      });
      return { ...state, userTasks: updatedTasks };
    case "UPDATE_USER_TASK":
      const updatedUserTasks = state.userTasks.map((task) => {
        if (task.task.id === action.payload.task.id) {
          return action.payload;
        }
        return task;
      });
      return { ...state, userTasks: updatedUserTasks };
    case "SET_USER_AUTH":
      return { ...state, userAuth: action.payload };
    case "RESET_USER_CONTEXT":
      return initialState;
    default:
      return state;
  }
}

type UserContextType = {
  state: DetailedUser;
  dispatch: React.Dispatch<UserContextAction>;
};

export const UserContext = createContext({} as UserContextType);
