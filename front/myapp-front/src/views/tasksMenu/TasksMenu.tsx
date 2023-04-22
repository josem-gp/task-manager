import { Box, Modal, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilterBar from "../../components/filterBar/FilterBar";
import ElementsTab from "../../components/elementsTab/ElementsTab";
import { useContext, useState } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import { UserContext } from "../../context/user/UserContext";
import { colors } from "../../utils/colors";
import ActionBtn from "../../components/actionBtn/ActionBtn";
import ActionModal from "../../components/actionModal/ActionModal";
import { divideTasksByDate } from "../../utils/dateUtils";
import { modalStyles } from "../../utils/modalStyles";

function TasksMenu() {
  const { state: userState } = useContext(UserContext);
  const { state: groupState } = useContext(GroupContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tabHeaders = [
    {
      label: "Today",
      value: "1",
      type: "task" as const, // added this so that type is not taking as a string but as the literal value we want. In this case "task"
      data: divideTasksByDate(groupState.groupTasks).today || [],
    },
    {
      label: "Upcoming",
      value: "2",
      type: "task" as const,
      data: divideTasksByDate(groupState.groupTasks).upcoming || [],
    },
    {
      label: "Past",
      value: "3",
      type: "task" as const,
      data: divideTasksByDate(groupState.groupTasks).past || [],
    },
  ];

  return (
    <>
      <Typography variant="h5" sx={{ color: colors.textLight }}>
        Hello, {userState.userObject.user.username}!
      </Typography>
      <Typography variant="h4" marginBottom="30px" sx={{ fontWeight: "bold" }}>
        Welcome to {groupState.group.name}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        width="100%"
        alignItems="center"
        marginBottom="30px"
      >
        <Typography variant="h6">
          There are {tabHeaders[0].data.length} tasks due today
        </Typography>
        <CalendarMonthIcon fontSize="large" />
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyles}>
          <FilterBar handleClose={handleClose} />
        </Box>
      </Modal>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <ActionModal
          type="task"
          btnName="New Task"
          action="create"
          setGroup={true}
          initialData={{
            task: {
              name: "",
              note: "",
              finished: false,
              due_date: "",
              assignee_id: null,
              group_id: groupState.group.id,
              tag_ids: [],
            },
          }}
        />
        <ActionBtn
          name="Filter by"
          fontColor={colors.textLight}
          backgroundColor={colors.backgroundDark}
          borderColor={colors.grayBtn}
          onClick={handleOpen}
        />
      </Stack>
      <ElementsTab tabHeaders={tabHeaders} />
    </>
  );
}

export default TasksMenu;
