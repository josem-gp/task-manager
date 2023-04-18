import { useContext, useState } from "react";
import { Box, Grid, Modal, Typography } from "@mui/material";
import useAxios from "../../../hooks/useAxios/useAxios";
import ModalTag from "../../actionModal/tag/ModalTag";
import { PopupContext } from "../../../context/popup/PopupContext";
import { GroupContext } from "../../../context/group/GroupContext";
import { TagRendererProps } from "./TagCard.types";
import { TagResponse, TagRequest } from "../../../shared/tag/interfaces";

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

  // Update a specific tag in the groupTags state
  async function handleSubmit(data: TagRequest) {
    const response = await handleAxiosCall<TagRequest, TagResponse>({
      method: "patch",
      url: `http://localhost:3000/api/v1/groups/${groupState.group.id}/tags/${element.id}`,
      data: data,
      needAuth: true,
    });

    if (response) {
      groupDispatch({
        type: "UPDATE_GROUP_TAG",
        payload: response.data.tag,
      });

      // Add notification
      setPopup({ message: response.data.message, type: "success" });
    }
  }

  return (
    <Grid item>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ModalTag
            action="show"
            initialData={initialData}
            handleSubmit={(data: TagRequest) => handleSubmit(data)}
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
