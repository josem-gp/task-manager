import { Box, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilterTasks from "../../components/filterBar/FilterBar";
import ElementsTab from "../../components/elementsTab/ElementsTab";
import { useContext } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import { UserContext } from "../../context/user/UserContext";
import { colors } from "../../utils/colors";

function TasksMenu() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);

  const tabHeaders = [
    {
      label: "Today",
      value: "1",
      type: "task" as const, // added this so that type is not taking as a string but as the literal value we want. In this case "task"
      data: groupState.groupTasks?.today || [],
    },
    {
      label: "Upcoming",
      value: "2",
      type: "task" as const,
      data: groupState.groupTasks?.upcoming || [],
    },
    {
      label: "Past",
      value: "3",
      type: "task" as const,
      data: groupState.groupTasks?.past || [],
    },
  ];

  return (
    <>
      <Typography variant="h5" sx={{ color: colors.textLight }}>
        Hello, {userState.userObject.user.username}!
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        width="100%"
        alignItems="center"
        marginBottom="30px"
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          You've got {groupState.groupTasks?.today.length} tasks today
        </Typography>
        <CalendarMonthIcon fontSize="large" />
      </Stack>
      <FilterTasks />
      <Typography
        variant="h4"
        marginTop="30px"
        marginBottom="10px"
        sx={{ fontWeight: "bold" }}
      >
        My tasks
      </Typography>
      <ElementsTab tabHeaders={tabHeaders} />
    </>
  );
}

export default TasksMenu;
