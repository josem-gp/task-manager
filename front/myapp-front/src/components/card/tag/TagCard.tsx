import { useContext, useState } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import useAxios from "../../../hooks/useAxios/useAxios";
import ModalTag from "../../actionModal/tag/ModalTag";
import { PopupContext } from "../../../context/popup/PopupContext";
import { GroupContext } from "../../../context/group/GroupContext";
import { TagRendererProps } from "./TagCard.types";
import { TagRequest } from "../../../shared/tag/interfaces";
import { handleTagUpdate } from "../../../api/tag/api";
import { modalStyles } from "../../../utils/modalStyles";

function TagCard({ element }: TagRendererProps) {
  const { setPopup } = useContext(PopupContext);
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleAxiosCall } = useAxios();

  const initialData: TagRequest = {
    tag: {
      name: element.name || "",
    },
  };

  return (
    <Grid item>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyles}>
          <ModalTag
            action="show"
            initialData={initialData}
            handleSubmit={(data: TagRequest) =>
              handleTagUpdate(
                {
                  groupState,
                  groupDispatch,
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
        {element.slug}
      </Typography>
    </Grid>
  );
}

export default TagCard;
