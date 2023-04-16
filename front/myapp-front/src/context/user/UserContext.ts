import { createContext } from "react";
import {
  GroupDetails,
  User,
  DividedUserDetails,
  DividedTaskDetails,
} from "../../types/interfaces";

export const initialState: User = {
  userObject: {
    user: { id: 0, username: "", email: "", icon_id: 0 },
    user_icon: { id: 0, name: "", url: "" },
  },
  userGroups: [],
  userTasks: [],
  userAuth: "",
};

export type UserContextAction =
  | { type: "SET_USER"; payload: DividedUserDetails }
  | { type: "SET_USER_GROUPS"; payload: GroupDetails[] }
  | { type: "SET_USER_TASKS"; payload: DividedTaskDetails[] }
  | { type: "ADD_USER_TASK"; payload: DividedTaskDetails }
  | { type: "REMOVE_USER_TASK"; payload: string }
  | { type: "UPDATE_USER_TASK"; payload: DividedTaskDetails }
  | { type: "SET_USER_AUTH"; payload: string };

export function reducer(state: User, action: UserContextAction) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userObject: action.payload };
    case "SET_USER_GROUPS":
      return { ...state, userGroups: action.payload };
    case "SET_USER_TASKS":
      return { ...state, userTasks: action.payload };
    case "ADD_USER_TASK":
      return { ...state, userTasks: [...state.userTasks, action.payload] };
    case "REMOVE_USER_TASK":
      const updatedTasks = state.userTasks.filter((task) => {
        return task.task.id.toString() !== action.payload;
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
    default:
      return state;
  }
}

type UserContextType = {
  state: User;
  dispatch: React.Dispatch<UserContextAction>;
};

export const UserContext = createContext({} as UserContextType);
