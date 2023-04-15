import {
  Avatar,
  Box,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "../../utils/colors";
import { useContext, useState } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { TaskRendererProps } from "./Card.types";
import { fetchIconUrl } from "../../utils/fetchUserIcon";
import ModalTask from "../actionModal/ModalTask";
import { UseApiProps } from "../../types/types";
import {
  TaskFormDetails,
  TaskResponse,
  TasksResponse,
} from "../../types/interfaces";
import { UserContext } from "../../context/user/UserContext";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { fetchData } from "../../utils/fetchApiData";
import { ErrorContext } from "../../context/error/ErrorContext";
import { DividedTaskDetails } from "../../types/interfaces";

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

function TaskCard({ element }: TaskRendererProps) {
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const { state: userState } = useContext(UserContext);
  const { error, setError } = useContext(ErrorContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialData: TaskFormDetails = {
    task: {
      name: element.task.name || "",
      note: element.task?.note || "",
      finished: element.task.finished,
      due_date: element.task.due_date || "",
      assignee_id: element.task.assignee_id.toString() || "",
      group_id: element.task.group_id.toString() || "",
      tag_ids: element.task_tags.map((tag) => tag.id),
    },
  };

  function handleSubmit(data: TaskFormDetails) {
    const params: UseApiProps<TaskFormDetails> = {
      method: "patch",
      url: `http://localhost:3000/api/v1/tasks/${element.task.id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${userState.userAuth}`,
        "Content-Type": "application/json",
      } as AxiosRequestHeaders,
    };

    fetchData<TaskFormDetails, TaskResponse>(params)
      .then((response: AxiosResponse<TaskResponse> | AxiosError) => {
        if ("data" in response) {
          // To set the new group tasks in the context
          groupDispatch({
            type: "UPDATE_GROUP_TASK",
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ModalTask
            action="show"
            setGroup={true}
            initialData={initialData}
            handleSubmit={(data: TaskFormDetails) => handleSubmit(data)}
          />
        </Box>
      </Modal>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: "360px",
          marginBottom: "10px !important",
          cursor: "pointer",
          "&:hover": {
            elevation: "3",
          },
        }}
        onClick={handleOpen}
      >
        <Stack
          direction="row"
          spacing={2}
          width="100%"
          alignItems="center"
          marginTop="3px"
        >
          <Stack
            direction="row"
            spacing={2}
            width="100%"
            height="fit-content"
            overflow="scroll"
            sx={{ padding: "0px 0px 0px 20px" }}
          >
            {element.task_tags.map((tag) => (
              <Typography
                key={tag.id}
                border={`2px solid ${colors.primary}`}
                padding="2px 6px"
                borderRadius="4px"
                variant="subtitle2"
              >
                {tag.name}
              </Typography>
            ))}
          </Stack>

          <Avatar
            src={fetchIconUrl(groupState.groupUsers, element.task.user_id)}
            alt="Owner's profile picture"
            sx={{ width: 30, height: 30 }}
          />

          {element.task.finished ? (
            <IconButton
              sx={{
                color: "#62c762",
              }}
            >
              <CheckCircleIcon />
            </IconButton>
          ) : (
            <IconButton>
              <CheckCircleIcon />
            </IconButton>
          )}
        </Stack>
        <Typography sx={{ padding: "10px 20px 10px 20px" }} variant="h5">
          {element.task.name}
        </Typography>
        <Stack
          spacing={1}
          sx={{
            padding: "0px 20px 10px 20px",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="caption">{element.task.due_date}</Typography>
            </Stack>
          </Box>
          <Box>
            <Typography variant="caption" fontWeight="bold">
              Assigned to:
            </Typography>
            <Typography variant="caption" sx={{ ml: 1 }}>
              {groupState.groupUsers &&
                groupState.groupUsers.find(
                  (u) => u.user.id === element.task.assignee_id
                )?.user.username}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </>
  );
}

export default TaskCard;
