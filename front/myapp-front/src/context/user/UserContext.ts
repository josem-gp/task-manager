import { createContext } from "react";
import {
  GroupDetails,
  TaskDetails,
  User,
  UserDetails,
} from "../../types/interfaces";

export const initialState: User = {
  user: null,
  userGroups: null,
  userTasks: null,
  userAuth: null,
};

type UserContextAction =
  | { type: "SET_USER"; payload: UserDetails | null }
  | { type: "SET_USER_GROUPS"; payload: GroupDetails[] | null }
  | { type: "SET_USER_TASKS"; payload: TaskDetails[] | null }
  | { type: "SET_USER_AUTH"; payload: string | null };

export function reducer(state: User, action: UserContextAction) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_USER_GROUPS":
      return { ...state, userGroups: action.payload };
    case "SET_USER_TASKS":
      return { ...state, userTasks: action.payload };
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
