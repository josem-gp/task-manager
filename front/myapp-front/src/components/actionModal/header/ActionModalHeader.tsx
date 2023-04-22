import { IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteAlertDialog from "../alertDialog/delete/DeleteAlertDialog";
import { ActionModalHeaderProps } from "./ActionModalHeader.types";
import { useContext } from "react";
import { PopupContext } from "../../../context/popup/PopupContext";
import { UserContext } from "../../../context/user/UserContext";
import useAxios from "../../../hooks/useAxios/useAxios";
import { handleTaskDelete } from "../../../api/task/api";

function ActionModalHeader({
  title,
  isShow,
  setFormAction,
  elementId,
  type,
}: ActionModalHeaderProps) {
  const { setPopup } = useContext(PopupContext);
  const { dispatch: userDispatch } = useContext(UserContext);
  const { handleAxiosCall } = useAxios();

  let handleDelete;

  switch (type) {
    case "task":
      handleDelete = () =>
        handleTaskDelete({
          userDispatch,
          setPopup,
          handleAxiosCall,
          elementId,
        });
    case "group":

    case "tag":

    case "invitation":

    default:
      return null;
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
            {elementId && <DeleteAlertDialog elementId={elementId} />}
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default ActionModalHeader;
