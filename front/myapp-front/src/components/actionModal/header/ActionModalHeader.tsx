import { IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteAlertDialog from "../alertDialog/delete/DeleteAlertDialog";
import { ActionModalHeaderProps } from "./ActionModalHeader.types";
import { useContext } from "react";
import { PopupContext } from "../../../context/popup/PopupContext";
import { UserContext } from "../../../context/user/UserContext";
import useAxios from "../../../hooks/useAxios/useAxios";
import { handleTaskDelete } from "../../../api/task/api";
import { handleTagDelete } from "../../../api/tag/api";
import { GroupContext } from "../../../context/group/GroupContext";

function ActionModalHeader({
  title,
  isShow,
  setFormAction,
  elementId,
  type,
}: ActionModalHeaderProps) {
  const { setPopup } = useContext(PopupContext);
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const { dispatch: userDispatch } = useContext(UserContext);
  const { handleAxiosCall } = useAxios();

  let handleDelete!: () => Promise<void>;

  switch (type) {
    case "task":
      handleDelete = () =>
        handleTaskDelete({
          userDispatch,
          setPopup,
          handleAxiosCall,
          elementId: elementId!,
        });
      break;
    case "tag":
      handleDelete = () =>
        handleTagDelete({
          groupState,
          groupDispatch,
          setPopup,
          handleAxiosCall,
          elementId: elementId!,
        });
      break;
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Stack
        direction="row"
        spacing={0}
        alignItems="center"
        justifyContent="space-between"
      >
        {isShow && (
          <>
            <IconButton
              onClick={() => {
                setFormAction("edit");
              }}
              size="small"
            >
              <EditIcon />
            </IconButton>
            <DeleteAlertDialog handleDelete={handleDelete} />
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default ActionModalHeader;
