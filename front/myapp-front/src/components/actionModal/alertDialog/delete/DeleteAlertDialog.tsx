import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import useAxios from "../../../../hooks/useAxios/useAxios";
import { PopupContext } from "../../../../context/popup/PopupContext";
import { UserContext } from "../../../../context/user/UserContext";
import { DeleteAlertDialogProps } from "./DeleteAlertDialog.types";
import { handleTaskDelete } from "../../../../api/task/api";

export default function DeleteAlertDialog({
  elementId,
}: DeleteAlertDialogProps) {
  const [open, setOpen] = useState(false);
  const { handleAxiosCall } = useAxios();
  const { setPopup } = useContext(PopupContext);
  const { dispatch: userDispatch } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Button
            onClick={() =>
              handleTaskDelete({
                userDispatch,
                setPopup,
                handleAxiosCall,
                elementId,
              })
            }
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
