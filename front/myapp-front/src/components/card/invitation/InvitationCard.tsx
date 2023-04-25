import { useContext } from "react";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { GroupContext } from "../../../context/group/GroupContext";
import { UserContext } from "../../../context/user/UserContext";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { InvitationRendererProps } from "./InvitationCard.types";
import { handleInvitationDelete } from "../../../api/invitation/api";
import { PopupContext } from "../../../context/popup/PopupContext";
import useAxios from "../../../hooks/useAxios/useAxios";

function InvitationCard({ element }: InvitationRendererProps) {
  const { state: userState } = useContext(UserContext);
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const { setPopup } = useContext(PopupContext);
  const { handleAxiosCall } = useAxios();

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
          onClick={() =>
            handleInvitationDelete({
              groupDispatch,
              setPopup,
              handleAxiosCall,
              elementId: element.id,
            })
          }
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Paper>
  );
}

export default InvitationCard;
