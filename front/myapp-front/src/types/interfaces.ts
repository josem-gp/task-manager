export interface UserFormDetails {
  user: {
    username?: string;
    email: string;
    password: string;
  };
}

export interface UserResponse {
  user: UserDetails;
}

export interface TasksResponse {
  tasks: DividedTasks;
}

export interface UserDetails {
  id: number;
  username: string;
  email: string;
  icon_id: number;
}
export interface GroupDetails {
  id: number;
  name: string;
  description: string;
  admin_id: number;
}

export interface TaskDetails {
  id: number;
  name: string;
  note: string;
  due_date: string;
  finished: boolean;
  group_id: number;
  user_id: number;
  assignee_id: number;
}

export interface DividedTaskDetails {
  task: TaskDetails;
  task_tags: TagDetails[];
}

export interface DividedTasks {
  past: DividedTaskDetails[];
  today: DividedTaskDetails[];
  upcoming: DividedTaskDetails[];
}

export interface TagDetails {
  id: number;
  name: string;
  slug: string;
  group_id: number;
  user_id: number;
}

export interface InvitationDetails {
  id: number;
  email: string;
  expiration_date: string;
  group_id: number;
  sender_id: number;
  recipient_id: number;
  disabled: boolean;
}

export interface User {
  user: UserDetails;
  userGroups: GroupDetails[];
  userTasks: TaskDetails[];
  userAuth: string;
}

export interface Group {
  group: GroupDetails;
  groupUsers: UserDetails[];
  groupTasks: DividedTasks;
  groupTags: TagDetails[];
  groupInvitations: InvitationDetails[];
}
