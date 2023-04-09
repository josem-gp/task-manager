import { Button } from "@mui/material";
import { SidebarIconBtnProps } from "./SidebarIconBtn.types";
import { colors } from "../../utils/colors";

const onlyIconStyles = {
  minWidth: "45px",
  borderRadius: "50%",
  height: "45px",
  width: "45px",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
  justifyContent: "flex-start",
};

function SidebarIconBtn({
  name,
  icon,
  checked,
  onClick,
  onlyIcon,
}: SidebarIconBtnProps) {
  return (
    <Button
      name="profile"
      variant="contained"
      startIcon={icon}
      onClick={onClick}
      sx={{
        "& .MuiButton-startIcon > *:nth-of-type(1)": {
          fontSize: "20px",
        },
        boxShadow: checked ? "auto" : "none",
        color: checked ? colors.textDark : colors.textLight,
        fontWeight: "bold",
        backgroundColor: checked ? colors.primary : "transparent",
        "&:hover": {
          backgroundColor: checked ? colors.primary : colors.backgroundLight,
        },
        ...(onlyIcon && onlyIconStyles),
      }}
    >
      {!onlyIcon && name}
    </Button>
  );
}

export default SidebarIconBtn;
