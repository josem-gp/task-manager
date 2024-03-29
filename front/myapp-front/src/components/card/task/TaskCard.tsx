import {
  Avatar,
  Box,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "../../../utils/colors";
import { useContext, useState } from "react";
import { GroupContext } from "../../../context/group/GroupContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { fetchIconUrl } from "../../../utils/fetchUserIcon";
import ModalTask from "../../actionModal/task/ModalTask";
import { UserContext } from "../../../context/user/UserContext";
import { PopupContext } from "../../../context/popup/PopupContext";
import useAxios from "../../../hooks/useAxios/useAxios";
import { TaskRendererProps } from "./TaskCard.types";
import { TaskRequest } from "../../../shared/task/interfaces";
import { handleTaskUpdate } from "../../../api/task/api";
import { modalStyles } from "../../../utils/modalStyles";

function TaskCard({ element }: TaskRendererProps) {
  const { state: groupState } = useContext(GroupContext);
  const { dispatch: userDispatch } = useContext(UserContext);
  const { setPopup } = useContext(PopupContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleAxiosCall } = useAxios();

  const initialData: TaskRequest = {
    task: {
      name: element.task.name,
      note: element.task?.note,
      finished: element.task.finished,
      due_date: element.task.due_date,
      assignee_id: element.task.assignee_id,
      group_id: element.task.group_id,
      tag_ids: element.task_tags.map((tag) => tag.id),
    },
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyles}>
          <ModalTask
            action="show"
            initialData={initialData}
            elementId={element.task.id}
            handleSubmit={(data: TaskRequest) =>
              handleTaskUpdate(
                {
                  userDispatch,
                  setPopup,
                  handleAxiosCall,
                  element,
                  handleClose,
                },
                data
              )
            }
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
