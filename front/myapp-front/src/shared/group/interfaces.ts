import { Invitation } from "../invitation/interfaces";
import { Tag } from "../tag/interfaces";
import { TaskObject } from "../task/interfaces";
import { UserObject } from "../user/interfaces";

export interface Group {
  id: number;
  name: string;
  description: string;
  admin_id: number;
}

export interface GroupRequest {
  group: Pick<Group, "name" | "description">;
}

export interface GroupResponse {
  group: Group;
  message: string;
}

export interface DetailedGroupResponse {
  group: Group;
  groupUsers: UserObject[];
  groupTags: Tag[];
  groupInvitations: Invitation[];
}

export interface DetailedGroup extends DetailedGroupResponse {
  groupTasks: TaskObject[];
}
