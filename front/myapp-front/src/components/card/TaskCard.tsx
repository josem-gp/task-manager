import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { colors } from "../../utils/colors";
import { useContext } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CardRendererProps } from "./Card.types";

function TaskCard({ element }: CardRendererProps) {
  const { state: groupState } = useContext(GroupContext);

  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        marginBottom: "10px !important",
        cursor: "pointer",
        "&:hover": {
          elevation: "3",
        },
      }}
    >
      <Stack direction="row" spacing={2} width="100%">
        <Stack
          direction="row"
          spacing={2}
          width="100%"
          sx={{ padding: "20px 0px 0px 20px" }}
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
      <Stack direction="row" spacing={1} sx={{ padding: "0px 0px 10px 20px" }}>
        <Typography variant="caption" fontWeight="bold">
          Owner:
        </Typography>
        <Typography variant="caption">
          {groupState.groupUsers &&
            groupState.groupUsers.find(
              (user) => user.id === element.task.user_id
            )?.username}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ padding: "0px 0px 10px 20px" }}>
        <Typography variant="caption" fontWeight="bold">
          Assigned to:
        </Typography>
        <Typography variant="caption">
          {groupState.groupUsers &&
            groupState.groupUsers.find(
              (user) => user.id === element.task.assignee_id
            )?.username}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default TaskCard;
