import { Box, Modal, Typography } from "@mui/material";
import { useContext, useState } from "react";
import ActionBtn from "../actionBtn/ActionBtn";
import { ActionModalProps } from "./ActionModal.types";
import ModalTask from "./ModalTask";
import ModalGroup from "./ModalGroup";
import ModalTag from "./ModalTag";
import ModalInvitation from "./ModalInvitation";
import { TaskFormDetails, TaskResponse } from "../../types/interfaces";
import useAxios from "../../hooks/useAxios/useAxios";
import { UserContext } from "../../context/user/UserContext";
import { PopupContext } from "../../context/popup/PopupContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ActionModal({
  type,
  btnName,
  action,
  initialData,
  setGroup,
}: ActionModalProps) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { popup, setPopup } = useContext(PopupContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleAxiosCall } = useAxios();

  async function handleSubmit(data: TaskFormDetails) {
    const response = await handleAxiosCall<TaskFormDetails, TaskResponse>({
      method: "post",
      url: "http://localhost:3000/api/v1/tasks",
      data: data,
      needAuth: true,
    });

    if (response) {
      // Add task to userTasks after task creation
      userDispatch({
        type: "ADD_USER_TASK",
        payload: response.data.task_value,
      });
      // Add notification
      setPopup({ message: response.data.message, type: "success" });
    }

    // Closing the modal
    handleClose();
  }

  function modalRenderer() {
    switch (type) {
      case "task":
        return (
          <ModalTask
            action={action}
            setGroup={setGroup}
            initialData={initialData}
            handleSubmit={(data: TaskFormDetails) => handleSubmit(data)}
          />
        );
      case "group":
        return <ModalGroup />;
      case "tag":
        return <ModalTag />;
      case "invitation":
        return <ModalInvitation />;
      default:
        return null;
    }
  }

  return (
    <div>
      <ActionBtn name={btnName} onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>{modalRenderer()}</Box>
      </Modal>
    </div>
  );
}

export default ActionModal;
