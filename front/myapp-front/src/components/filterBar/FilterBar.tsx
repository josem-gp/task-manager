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
import { colors } from "../../utils/colors";
import MyDatePicker from "../myDatePicker/MyDatePicker";
import { UseApiProps } from "../../types/types";
import { FilterBarParams } from "./FilterBar.types";
import { fetchData } from "../../utils/fetchApiData";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { ErrorContext } from "../../context/error/ErrorContext";
import { TasksResponse } from "../../types/interfaces";
import useFilterOptions from "../../hooks/useFilterOptions";

function FilterBar() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const { error, setError } = useContext(ErrorContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  // Any asynchronous code that we run after dispatch (e.g. making API calls, setting timeouts/intervals)
  // may not complete before the state update is finished. In such cases, we need to use other mechanisms
  // like promises or useEffect to ensure that your code executes in the correct order.
  const [isResetting, setIsResetting] = useState(false);
  const { elementSelectProps, elementDateProps } = useFilterOptions();

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
          setError(
            response.response?.statusText as React.SetStateAction<string | null>
          );
        }
      })
      .catch((error: AxiosError) => {
        setError(error.response?.data as React.SetStateAction<string | null>);
      });
  }

  function handleReset() {
    // To reset the tasks
    dispatch({ type: "RESET" });
    setIsResetting(true);
  }

  useEffect(() => {
    if (isResetting) {
      handleFilter();
      setIsResetting(false);
    }
  }, [isResetting]);

  return (
    <>
      <Typography
        variant="h6"
        borderBottom="2px solid #f9bb19"
        padding="2px 0px"
        width="fit-content"
        sx={{
          marginLeft: "8px",
          marginTop: "20px",
          marginBottom: "20px",
          textTransform: "uppercase",
          fontSize: "15px",
        }}
      >
        Filter by
      </Typography>
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
          name="Filter"
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
      <Grid container spacing={1} wrap="wrap" alignItems="end">
        {elementSelectProps.map((props, index) => (
          <Grid item key={index} xs={4} sx={{ maxWidth: "150px !important" }}>
            <ElementSelect {...props} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1} wrap="wrap" alignItems="end">
        {elementDateProps.map((props, index) => (
          <Grid item xs={6} sx={{ maxWidth: "150px !important" }}>
            <MyDatePicker {...props} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FilterBar;
