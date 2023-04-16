import { IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import DeleteAlertDialog from "../alertDialog/delete/DeleteAlertDialog";
import { ActionModalHeaderProps } from "./ActionModalHeader.types";

function ActionModalHeader({
  title,
  isShow,
  setFormAction,
  elementId,
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
            <DeleteAlertDialog elementId={elementId} />
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default ActionModalHeader;
