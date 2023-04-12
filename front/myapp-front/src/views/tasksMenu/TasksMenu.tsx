import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilterBar from "../../components/filterBar/FilterBar";
import ElementsTab from "../../components/elementsTab/ElementsTab";
import { useContext, useState } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import { UserContext } from "../../context/user/UserContext";
import { colors } from "../../utils/colors";
import ActionBtn from "../../components/actionBtn/ActionBtn";
import ActionModal from "../../components/actionModal/ActionModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TasksMenu() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          There are {groupState.groupTasks?.today.length} tasks due today
        </Typography>
        <CalendarMonthIcon fontSize="large" />
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FilterBar closeModal={handleClose} />
        </Box>
      </Modal>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <ActionModal
          type="task"
          btnName="New Task"
          action="create"
          setGroup={true}
          handleSubmit={() => console.log("hi")}
          initialData={{
            task: {
              name: "",
              note: "",
              finished: false,
              due_date: "",
              assignee_id: "",
              group_id: groupState.group.id.toString(),
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
