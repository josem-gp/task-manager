import { Button } from "@mui/material";
import { SidebarIconBtnProps } from "./SidebarIconBtn.types";
import { colors } from "../../utils/colors";

function SidebarIconBtn({ name, icon, checked, onClick }: SidebarIconBtnProps) {
  return (
    <Button
      name="profile"
      variant={checked ? "contained" : "text"}
      startIcon={icon}
      onClick={onClick}
      sx={{
        color: checked ? colors.textDark : colors.textLight,
        fontWeight: "bold",
        backgroundColor: checked ? colors.primary : "transparent",
        "&:hover": {
          backgroundColor: checked ? colors.primary : colors.backgroundLight,
        },
      }}
    >
      {name}
    </Button>
  );
}

export default SidebarIconBtn;
