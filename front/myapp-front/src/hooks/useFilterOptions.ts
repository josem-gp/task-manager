import { useContext, useReducer } from "react";
import { GroupContext } from "../context/group/GroupContext";
import {
  initialState,
  reducer,
} from "../components/filterBar/filterBarReducer";
import { TaskStatus } from "../components/elementSelect/ElementSelect.types";
import { colors } from "../utils/colors";
import dayjs from "dayjs";

export default function useFilterOptions() {
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const taskStatus: TaskStatus[] = [
    {
      id: "0",
      name: "false",
    },
    {
      id: "1",
      name: "true",
    },
  ];

  const elementSelectProps = [
    {
      name: "Owner",
      elements: groupState.groupUsers,
      elementId: state.by_owner_id,
      setElementId: (id: string) => {
        dispatch({ type: "SET_OWNER_ID", payload: id });
      },
    },
    {
      name: "Assignee",
      elements: groupState.groupUsers,
      elementId: state.by_assignee_id,
      setElementId: (id: string) =>
        dispatch({ type: "SET_ASSIGNEE_ID", payload: id }),
    },
    {
      name: "Status",
      elements: taskStatus,
      elementId: state.by_status,
      setElementId: (id: string) =>
        dispatch({ type: "SET_STATUS", payload: id }),
    },
  ];

  const elementDateProps = [
    {
      label: "From",
      value: state.from_due_date,
      setElement: (newValue: dayjs.Dayjs | null) =>
        dispatch({
          type: "SET_FROM_DUE_DATE",
          // Ensure that the payload property always has a string or null value, even if the format method returns undefined.
          payload: newValue?.format("YYYY/MM/DD") ?? null,
        }),
    },
    {
      label: "To",
      value: state.to_due_date,
      setElement: (newValue: dayjs.Dayjs | null) =>
        dispatch({
          type: "SET_TO_DUE_DATE",
          // Ensure that the payload property always has a string or null value, even if the format method returns undefined.
          payload: newValue?.format("YYYY/MM/DD") ?? null,
        }),
    },
  ];

  return { elementSelectProps, elementDateProps, state, dispatch };
}
