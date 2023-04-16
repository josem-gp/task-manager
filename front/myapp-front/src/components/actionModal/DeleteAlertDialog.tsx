import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import useAxios from "../../hooks/useAxios/useAxios";
import { ApiMessageResponse } from "../../types/interfaces";
import { PopupContext } from "../../context/popup/PopupContext";
import { UserContext } from "../../context/user/UserContext";
import { DeleteAlertDialogProps } from "./ActionModal.types";

export default function DeleteAlertDialog({
  elementId,
}: DeleteAlertDialogProps) {
  const [open, setOpen] = useState(false);
  const { handleAxiosCall } = useAxios();
  const { popup, setPopup } = useContext(PopupContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Remove a task
  async function handleDelete() {
    const response = await handleAxiosCall<undefined, ApiMessageResponse>({
      method: "delete",
      url: `http://localhost:3000/api/v1/tasks/${elementId}`,
      needAuth: true,
    });

    if (response) {
      // Remove task from UserTasks
      userDispatch({
        type: "REMOVE_USER_TASK",
        payload: elementId,
      });
      // Add notification
      setPopup({ message: response.data.message, type: "success" });
    }
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen} size="small">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
