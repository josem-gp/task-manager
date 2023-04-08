import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ActionBtn from "../actionBtn/ActionBtn";
import { ElementSelect } from "../elementSelect/ElementSelect";
import { UserContext } from "../../context/user/UserContext";
import { useContext, useEffect, useReducer, useState } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import { initialState, reducer } from "./filterBarReducer";
import { TaskStatus } from "../elementSelect/ElementSelect.types";
import { colors } from "../../utils/colors";
import MyDatePicker from "../myDatePicker/MyDatePicker";
import dayjs from "dayjs";
import { UseApiProps } from "../../types/types";
import { FilterBarParams } from "./FilterBar.types";
import { fetchData } from "../../utils/fetchApiData";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { ErrorContext } from "../../context/error/ErrorContext";
import { TasksResponse } from "../../types/interfaces";

function FilterBar() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const errorContext = useContext(ErrorContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  // We don't want to run the useEffect on the first rendering so we use this
  const [mounted, setMounted] = useState(false);

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

  function handleFilter() {
    const params: UseApiProps<FilterBarParams> = {
      method: "post",
      url: `http://localhost:3000/api/v1/groups/${groupState.group?.id}/filter_tasks`,
      data: state,
      headers: {
        Authorization: `Bearer ${userState.userAuth}`,
        "Content-Type": "application/json",
      } as AxiosRequestHeaders,
    };

    fetchData<FilterBarParams, TasksResponse>(params)
      .then((response: AxiosResponse<TasksResponse> | AxiosError) => {
        if ("data" in response) {
          // To set the group tasks in the context
          groupDispatch({
            type: "SET_GROUP_TASKS",
            payload: response.data.tasks,
          });
        } else {
          errorContext.setError(
            response.response?.statusText as React.SetStateAction<string | null>
          );
        }
      })
      .catch((error: AxiosError) => {
        errorContext.setError(
          error.response?.data as React.SetStateAction<string | null>
        );
      });
  }

  function handleReset() {
    console.log(state);
  }

  useEffect(() => {
    if (mounted) {
      handleFilter();
    } else {
      setMounted(true);
    }
  }, [
    state.by_assignee_id,
    state.by_status,
    state.from_due_date,
    state.to_due_date,
  ]);

  return (
    <>
      <Stack
        width="100%"
        justifyContent="start"
        alignItems="center"
        direction="row"
        spacing={1}
      >
        <TextField
          onChange={(event) =>
            dispatch({ type: "SET_FUZZY_NAME", payload: event.target.value })
          }
          value={state.by_fuzzy_name}
          variant="standard"
          placeholder="Search tasks..."
          InputProps={{
            sx: {
              background: "#F4F4F4",
              padding: "12px",
              borderRadius: "4px",
            },
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="search tasks" onClick={handleFilter}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ActionBtn
          name="Search"
          fontColor={colors.primary}
          backgroundColor={colors.backgroundLight}
          borderColor={colors.primary}
          onClick={handleFilter}
        />
        <ActionBtn
          name="Reset"
          fontColor={colors.textLight}
          backgroundColor={colors.backgroundDark}
          borderColor={colors.grayBtn}
          onClick={handleReset}
        />
      </Stack>
      <Typography
        variant="h6"
        fontSize={14}
        borderBottom="2px solid #f9bb19"
        padding="2px 0px"
        width="fit-content"
        sx={{
          marginLeft: "8px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Filter by
      </Typography>
      <Grid container spacing={1} wrap="wrap" alignItems="end">
        <Grid item xs={3}>
          <ElementSelect
            name="Assignee"
            elements={groupState.groupUsers}
            elementId={state.by_assignee_id}
            setElementId={(id: string) =>
              dispatch({ type: "SET_ASSIGNEE_ID", payload: id })
            }
          />
        </Grid>
        <Grid item xs={3}>
          <ElementSelect
            name="Status"
            elements={taskStatus}
            elementId={state.by_status}
            setElementId={(id: string) =>
              dispatch({ type: "SET_STATUS", payload: id })
            }
          />
        </Grid>
        <Grid item xs={3}>
          <MyDatePicker
            state={state}
            label="From"
            fontColor={colors.primary}
            borderColor={colors.primary}
            setElement={(newValue: dayjs.Dayjs | null) =>
              dispatch({
                type: "SET_FROM_DUE_DATE",
                // Ensure that the payload property always has a string or null value, even if the format method returns undefined.
                payload: newValue?.format("YYYY/MM/DD") ?? null,
              })
            }
          />
        </Grid>
        <Grid item xs={3}>
          <MyDatePicker
            state={state}
            label="To"
            fontColor={colors.primary}
            borderColor={colors.primary}
            setElement={(newValue: dayjs.Dayjs | null) =>
              dispatch({
                type: "SET_TO_DUE_DATE",
                // Ensure that the payload property always has a string or null value, even if the format method returns undefined.
                payload: newValue?.format("YYYY/MM/DD") ?? null,
              })
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

export default FilterBar;
