export interface FilterBarParams {
  by_fuzzy_name: string;
  by_owner_id: string;
  by_assignee_id: string;
  by_status: string;
  from_due_date: string | null;
  to_due_date: string | null;
}
