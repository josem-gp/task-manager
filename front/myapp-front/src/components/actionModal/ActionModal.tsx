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
import { handleTaskCreate } from "../../api/task/api";
import { handleTagCreate } from "../../api/tag/api";
import { modalStyles } from "../../utils/modalStyles";
import { InvitationRequest } from "../../shared/invitation/interfaces";
import { handleInvitationCreate } from "../../api/invitation/api";
import { GroupRequest } from "../../shared/group/interfaces";
import { handleGroupCreate } from "../../api/group/api";

function ActionModal({
  type,
  btnName,
  action,
  initialData,
  setGroup,
}: ActionModalProps) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
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
              handleTaskCreate(
                { userDispatch, setPopup, handleAxiosCall, handleClose },
                data
              )
            }
          />
        );
      case "group":
        return (
          <ModalGroup
            action={action}
            initialData={initialData}
            handleSubmit={(data: GroupRequest) =>
              handleGroupCreate(
                {
                  userDispatch,
                  setPopup,
                  handleAxiosCall,
                  handleClose,
                },
                data
              )
            }
          />
        );
      case "tag":
        return (
          <ModalTag
            action={action}
            initialData={initialData}
            handleSubmit={(data: TagRequest) =>
              handleTagCreate(
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
        return (
          <ModalInvitation
            initialData={initialData}
            handleSubmit={(data: InvitationRequest) =>
              handleInvitationCreate(
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
      default:
        return null;
    }
  }

  return (
    <div>
      <ActionBtn name={btnName} onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyles}>{modalRenderer()}</Box>
      </Modal>
    </div>
  );
}

export default ActionModal;
