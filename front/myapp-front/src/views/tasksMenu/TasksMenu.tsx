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
import { divideTasksByDate } from "../../utils/dateUtils";
import { UseApiProps } from "../../types/types";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { ErrorContext } from "../../context/error/ErrorContext";
import { TaskFormDetails, TaskResponse } from "../../types/interfaces";
import { fetchData } from "../../utils/fetchApiData";

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
  const { error, setError } = useContext(ErrorContext);
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
      data: divideTasksByDate(userState.userTasks).today || [],
    },
    {
      label: "Upcoming",
      value: "2",
      type: "task" as const,
      data: divideTasksByDate(userState.userTasks).upcoming || [],
    },
    {
      label: "Past",
      value: "3",
      type: "task" as const,
      data: divideTasksByDate(userState.userTasks).past || [],
    },
  ];

  function handleSubmit(data: TaskFormDetails) {
    const params: UseApiProps<TaskFormDetails> = {
      method: "post",
      url: "http://localhost:3000/api/v1/tasks",
      data: data,
      headers: {
        Authorization: `Bearer ${userState.userAuth}`,
        "Content-Type": "application/json",
      } as AxiosRequestHeaders,
    };

    fetchData<TaskFormDetails, TaskResponse>(params)
      .then((response: AxiosResponse<TaskResponse> | AxiosError) => {
        if ("data" in response) {
          userDispatch({
            type: "ADD_USER_TASK",
            payload: response.data.task_value,
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

    // After create/editing task, we close modal
    handleClose();
  }

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
          handleSubmit={handleSubmit}
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
