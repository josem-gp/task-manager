export interface UserFormDetails {
  user: {
    username?: string;
    email: string;
    password: string;
  };
}

export interface UserAuth {
  headers: {
    authorization: string;
  };
}

interface UserDetails {
  id: number;
  username: string;
  email: string;
}

interface GroupDetails {
  id: number;
  name: string;
  description: string;
  admin_id: number;
}

interface TaskDetails {
  id: number;
  name: string;
  note: string;
  due_date: string;
  finished: boolean;
  group_id: number;
  user_id: number;
  assignee_id: number;
}

interface TagDetails {
  id: number;
  name: string;
  slug: string;
  group_id: number;
  user_id: number;
}

interface InvitationDetails {
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
}

export interface Users {
  users: UserDetails[];
}

export interface Group {
  group: GroupDetails;
}

export interface Groups {
  groups: GroupDetails[];
}

export interface Task {
  task: TaskDetails;
}

export interface Tasks {
  tasks: TaskDetails[];
}

export interface Tag {
  tag: TagDetails;
}

export interface Tags {
  tags: TagDetails[];
}

export interface Invitations {
  invitations: InvitationDetails[];
}
