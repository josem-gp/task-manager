export interface UserFormDetails {
  user: {
    username?: string;
    email: string;
    password: string;
  };
}

export interface TaskFormDetails {
  task: {
    name: string;
    note: string | null;
    finished: boolean;
    due_date: string;
    assignee_id: string;
    group_id: string;
    tag_ids: number[];
  };
}

export interface UserResponse {
  userObject: DividedUserDetails;
}

export interface TasksResponse {
  task_value: DividedTasks;
}

export interface UserDetails {
  id: number;
  username: string;
  email: string;
  icon_id: number;
}

export interface IconDetails {
  id: number;
  name: string;
  url: string;
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
  note: string | null;
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

export interface DividedUserDetails {
  user: UserDetails;
  user_icon: IconDetails;
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
  userObject: DividedUserDetails;
  userGroups: GroupDetails[];
  userTasks: DividedTaskDetails[];
  userAuth: string;
}

export interface Group {
  group: GroupDetails;
  groupUsers: DividedUserDetails[];
  groupTasks: DividedTasks;
  groupTags: TagDetails[];
  groupInvitations: InvitationDetails[];
}

export interface FilterBarParams {
  by_fuzzy_name: string;
  by_owner_id: string;
  by_assignee_id: string;
  by_status: string;
  from_due_date: string | null;
  to_due_date: string | null;
}
