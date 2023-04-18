import { Box, Modal } from "@mui/material";
import { useContext, useState } from "react";
import ActionBtn from "../actionBtn/ActionBtn";
import { ActionModalProps } from "./ActionModal.types";
import ModalTask from "./task/ModalTask";
import ModalGroup from "./group/ModalGroup";
import ModalTag from "./tag/ModalTag";
import ModalInvitation from "./invitation/ModalInvitation";
import useAxios from "../../hooks/useAxios/useAxios";
import { UserContext } from "../../context/user/UserContext";
import { PopupContext } from "../../context/popup/PopupContext";
import { GroupContext } from "../../context/group/GroupContext";
import { TaskRequest } from "../../shared/task/interfaces";
import { TagRequest } from "../../shared/tag/interfaces";
import { handleTaskSubmit } from "../../api/task/api";
import { handleTagSubmit } from "../../api/tag/api";

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
  const { dispatch: userDispatch } = useContext(UserContext);
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const { setPopup } = useContext(PopupContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleAxiosCall } = useAxios();

  function modalRenderer() {
    switch (type) {
      case "task":
        return (
          <ModalTask
            action={action}
            setGroup={setGroup}
            initialData={initialData}
            handleSubmit={(data: TaskRequest) =>
              handleTaskSubmit(
                { userDispatch, setPopup, handleAxiosCall, handleClose },
                data
              )
            }
          />
        );
      case "group":
        return <ModalGroup />;
      case "tag":
        return (
          <ModalTag
            action={action}
            initialData={initialData}
            handleSubmit={(data: TagRequest) =>
              handleTagSubmit(
                {
                  groupState,
                  groupDispatch,
                  setPopup,
                  handleAxiosCall,
                  handleClose,
                },
                data
              )
            }
          />
        );
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
