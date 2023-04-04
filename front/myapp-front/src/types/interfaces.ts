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
  user: UserDetails | null;
  userGroups: GroupDetails[] | null;
  userTasks: TaskDetails[] | null;
  userAuth: string | null;
}

export interface Group {
  group: GroupDetails | null;
  groupUsers: UserDetails[] | null;
  groupTasks: TaskDetails[] | null;
  groupTags: TagDetails[] | null;
  groupInvitations: InvitationDetails[] | null;
}
