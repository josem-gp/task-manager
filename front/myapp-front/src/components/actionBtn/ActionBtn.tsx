import { Button } from "@mui/material";
import { ActionBtnProps } from "./ActionBtn.types";

function ActionBtn({
  name,
  fontColor,
  backgroundColor,
  borderColor,
  onClick,
}: ActionBtnProps) {
  return (
    <Button
      variant="outlined"
      sx={{
        color: fontColor,
        fontWeight: "bold",
        border: `2px solid ${borderColor}`,
        "&:hover": {
          backgroundColor: backgroundColor,
          border: `2px solid ${borderColor}`,
        },
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
}

export default ActionBtn;
