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
}

export interface DetailedUser extends DetailedUserResponse {
  userAuth: string;
}
