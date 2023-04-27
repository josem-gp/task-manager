import { Box, Grid, Modal, Typography } from "@mui/material";
import { GroupRequest } from "../../../shared/group/interfaces";
import { modalStyles } from "../../../utils/modalStyles";
import { useContext, useState } from "react";
import { PopupContext } from "../../../context/popup/PopupContext";
import useAxios from "../../../hooks/useAxios/useAxios";
import { GroupRendererProps } from "./GroupCard.types";
import { UserContext } from "../../../context/user/UserContext";
import ModalGroup from "../../actionModal/group/ModalGroup";
import { handleGroupUpdate } from "../../../api/group/api";

function GroupCard({ element }: GroupRendererProps) {
  const { setPopup } = useContext(PopupContext);
  const { dispatch: userDispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleAxiosCall } = useAxios();

  const initialData: GroupRequest = {
    group: {
      name: element.name || "",
      description: element.description || "",
    },
  };

  return (
    <Grid item>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyles}>
          <ModalGroup
            action="show"
            initialData={initialData}
            handleSubmit={(data: GroupRequest) =>
              handleGroupUpdate(
                {
                  userDispatch,
                  setPopup,
                  handleAxiosCall,
                  element,
                  handleClose,
                },
                data
              )
            }
            elementId={element.id}
          />
        </Box>
      </Modal>
      <Typography
        variant="subtitle2"
        border="2px solid #f9bb19"
        padding="2px 6px"
        borderRadius="4px"
        sx={{
          cursor: "pointer",
          maxWidth: "fit-content",
        }}
        onClick={handleOpen}
      >
        {element.name}
      </Typography>
    </Grid>
  );
}

export default GroupCard;
