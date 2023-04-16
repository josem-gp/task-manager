import React, { useContext } from "react";
import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { GroupContext } from "../../../context/group/GroupContext";
import { fetchIconUrl } from "../../../utils/fetchUserIcon";
import { UserContext } from "../../../context/user/UserContext";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { InvitationRendererProps } from "./InvitationCard.types";

function InvitationCard({ element }: InvitationRendererProps) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: groupState } = useContext(GroupContext);

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        maxWidth: "360px",
        padding: "10px 0",
        marginBottom: "10px !important",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        width="184px"
        overflow="scroll"
      >
        <Stack direction="column">
          <Typography variant="button">{element.email}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="caption">{element.expiration_date}</Typography>
          </Stack>
        </Stack>
      </Stack>
      {userState.userObject.user.id === groupState.group.admin_id && ( // user needs to be admin
        <IconButton
          // onClick={() => handleUserDelete(user.id)}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Paper>
  );
}

export default InvitationCard;
