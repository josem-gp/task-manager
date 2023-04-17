import { Tag } from "../tag/interfaces";

export interface Task {
  id: number;
  name: string;
  note: string | null;
  due_date: string;
  finished: boolean;
  group_id: number;
  user_id: number;
  assignee_id: number;
}

export interface TaskRequest {
  task: Omit<Task, "id" | "user_id"> & {
    tag_ids: number[];
  };
}

export interface TaskObject {
  task: Task;
  task_tags: Tag[];
}

export interface TaskResponse {
  task_value: TaskObject;
  message: string;
}

export interface TasksDividedByDate {
  past: TaskObject[];
  today: TaskObject[];
  upcoming: TaskObject[];
}

export interface FilterTasksRequest {
  by_fuzzy_name: string;
  by_owner_id: string;
  by_assignee_id: string;
  by_status: string;
  from_due_date: string | null;
  to_due_date: string | null;
}
