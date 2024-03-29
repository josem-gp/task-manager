import { FilterTasksRequest } from "../../shared/task/interfaces";

export const initialState: FilterTasksRequest = {
  by_fuzzy_name: "",
  by_owner_id: null,
  by_assignee_id: null,
  by_status: null,
  from_due_date: null,
  to_due_date: null,
};

type FilterBarAction =
  | { type: "SET_FUZZY_NAME"; payload: string }
  | { type: "SET_OWNER_ID"; payload: number }
  | { type: "SET_ASSIGNEE_ID"; payload: number }
  | { type: "SET_STATUS"; payload: number }
  | { type: "SET_FROM_DUE_DATE"; payload: string | null }
  | { type: "SET_TO_DUE_DATE"; payload: string | null }
  | { type: "RESET" };

export function reducer(state: FilterTasksRequest, action: FilterBarAction) {
  switch (action.type) {
    case "SET_FUZZY_NAME":
      return { ...state, by_fuzzy_name: action.payload };
    case "SET_OWNER_ID":
      return { ...state, by_owner_id: action.payload };
    case "SET_ASSIGNEE_ID":
      return { ...state, by_assignee_id: action.payload };
    case "SET_STATUS":
      return { ...state, by_status: action.payload };
    case "SET_FROM_DUE_DATE":
      return { ...state, from_due_date: action.payload };
    case "SET_TO_DUE_DATE":
      return { ...state, to_due_date: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
