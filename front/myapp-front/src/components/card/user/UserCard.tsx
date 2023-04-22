import { useContext } from "react";
import { Avatar, Paper, Stack, Typography } from "@mui/material";
import { GroupContext } from "../../../context/group/GroupContext";
import { UserContext } from "../../../context/user/UserContext";
import { UserRendererProps } from "./UserCard.types";
import DeleteAlertDialog from "../../actionModal/alertDialog/delete/DeleteAlertDialog";
import { handleMemberDelete } from "../../../api/user/api";
import { PopupContext } from "../../../context/popup/PopupContext";
import useAxios from "../../../hooks/useAxios/useAxios";

function UserCard({ element }: UserRendererProps) {
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
            <DeleteAlertDialog
              type="user"
              handleDelete={() =>
                handleMemberDelete({
                  groupState,
                  groupDispatch,
                  setPopup,
                  handleAxiosCall,
                  elementId: element.user.id,
                })
              }
            />
          )}
      </Stack>
    </Paper>
  );
}

export default UserCard;
