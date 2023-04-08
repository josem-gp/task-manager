import { FilterBarParams } from "./FilterBar.types";

export const initialState: FilterBarParams = {
  by_fuzzy_name: "",
  by_assignee_id: "",
  by_status: "",
  from_due_date: null,
  to_due_date: null,
};

type FilterBarAction =
  | { type: "SET_FUZZY_NAME"; payload: string }
  | { type: "SET_ASSIGNEE_ID"; payload: string }
  | { type: "SET_STATUS"; payload: string }
  | { type: "SET_FROM_DUE_DATE"; payload: string | null }
  | { type: "SET_TO_DUE_DATE"; payload: string | null }
  | { type: "RESET" };

export function reducer(state: FilterBarParams, action: FilterBarAction) {
  switch (action.type) {
    case "SET_FUZZY_NAME":
      return { ...state, by_fuzzy_name: action.payload };
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
