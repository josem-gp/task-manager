import { IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActionModalHeaderProps } from "./ActionModal.types";

function ActionModalHeader({
  title,
  isShow,
  setFormAction,
}: ActionModalHeaderProps) {
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
            <IconButton
              // onClick={() => handleTaskDelete()}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default ActionModalHeader;
