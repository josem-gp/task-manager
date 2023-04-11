import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "../../utils/colors";
import { useContext } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { TaskRendererProps } from "./Card.types";
import { fetchIconUrl } from "../../utils/fetchUserIcon";

function TaskCard({ element }: TaskRendererProps) {
  const { state: groupState } = useContext(GroupContext);

  return (
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
      onClick={() => console.log("clicked", element.task.id)}
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
  );
}

export default TaskCard;
