import { useContext } from "react";
import { Avatar, IconButton, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { GroupContext } from "../../../context/group/GroupContext";
import { UserContext } from "../../../context/user/UserContext";
import { UserRendererProps } from "./UserCard.types";

function UserCard({ element }: UserRendererProps) {
  const { state: userState } = useContext(UserContext);
  const { state: groupState } = useContext(GroupContext);

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: "360px",
        padding: "10px 0",
        marginBottom: "10px !important",
        cursor: "pointer",
        "&:hover": {
          elevation: "3",
        },
      }}
      // onClick={() => handleOpenUserProfile(user)}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding="0 20px"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            src={element.user_icon.url}
            alt="Owner's profile picture"
            sx={{ width: 30, height: 30 }}
          />
          <Stack direction="column" width="148px" sx={{ overflow: "scroll" }}>
            <Typography variant="h6">{element.user.username}</Typography>
            <Typography variant="caption" sx={{ color: "#B5B5B5" }}>
              {element.user.email}
            </Typography>
          </Stack>
        </Stack>
        {userState.userObject.user.id === groupState.group.admin_id && // user needs to be admin
          element.user.id !== groupState.group.admin_id && ( // the admin won't see its own delete icon
            <IconButton
              // onClick={() => handleUserDelete(user.id)}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          )}
      </Stack>
    </Paper>
  );
}

export default UserCard;
