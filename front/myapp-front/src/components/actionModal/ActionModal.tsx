import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ActionBtn from "../actionBtn/ActionBtn";
import { ActionModalProps } from "./ActionModal.types";
import ModalTask from "./ModalTask";
import ModalGroup from "./ModalGroup";
import ModalTag from "./ModalTag";
import ModalInvitation from "./ModalInvitation";

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

function ActionModal({ type, btnName, action, initialData }: ActionModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function modalRenderer() {
    switch (type) {
      case "task":
        return <ModalTask action={action} initialData={initialData} />;
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
