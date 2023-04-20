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
import { useContext, useEffect, useState } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import { colors } from "../../utils/colors";
import MyDatePicker from "../myDatePicker/MyDatePicker";
import useFilterOptions from "../../hooks/useFilterOptions";
import { FilterBarProps } from "./FilterBar.types";
import useAxios from "../../hooks/useAxios/useAxios";
import { PopupContext } from "../../context/popup/PopupContext";
import { handleTaskFilter } from "../../api/task/api";

function FilterBar({ handleClose }: FilterBarProps) {
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const { setPopup } = useContext(PopupContext);
  // Any asynchronous code that we run after dispatch (e.g. making API calls, setting timeouts/intervals)
  // may not complete before the state update is finished. In such cases, we need to use other mechanisms
  // like promises or useEffect to ensure that your code executes in the correct order.
  const [isResetting, setIsResetting] = useState(false);
  const { elementSelectProps, elementDateProps, state, dispatch } =
    useFilterOptions();
  const { handleAxiosCall } = useAxios();

  function handleFilter() {
    handleTaskFilter({
      handleAxiosCall,
      groupState,
      state,
      groupDispatch,
      setPopup,
      handleClose,
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
        marginBottom="10px"
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
        <ActionBtn name="Filter" onClick={handleFilter} />
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
          <Grid item key={index} xs={6} sx={{ maxWidth: "150px !important" }}>
            <MyDatePicker {...props} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FilterBar;
