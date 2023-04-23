import { Group } from "../group/interfaces";
import { Icon } from "../icon/interfaces";
import { TaskObject } from "../task/interfaces";

export interface User {
  id: number;
  username: string;
  email: string;
  icon_id: number;
}

export interface UserRequest {
  user: {
    username: string;
    icon_id: number;
    current_password: string;
    password: string;
    password_confirmation: string;
  };
}

export interface UserObject {
  user: User;
  user_icon: Icon;
}

export interface UserResponse {
  userObject: UserObject;
  message: string;
}

export interface DetailedUserResponse {
  userObject: UserObject;
  userGroups: Group[];
  userTasks: TaskObject[];
  allIcons: Icon[];
}

export interface DetailedUser extends DetailedUserResponse {
  userAuth: string;
}
