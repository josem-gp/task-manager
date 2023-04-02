import { Button } from "@mui/material";
import { SidebarIconBtnProps } from "./SidebarIconBtn.types";

function SidebarIconBtn({ name, icon, checked, onClick }: SidebarIconBtnProps) {
  return (
    <Button
      name="profile"
      variant={checked ? "contained" : "text"}
      startIcon={icon}
      onClick={onClick}
      sx={{
        color: "#515151",
        fontWeight: "bold",
        // backgroundColor:
        //   selectedBtn === "profile" ? "#f9bb19" : "transparent",
        // "&:hover": {
        //   backgroundColor:
        //     selectedBtn === "profile"
        //       ? "#f7b613"
        //       : "rgba(255, 182, 0, 0.05);",
        // },
      }}
    >
      {name}
    </Button>
  );
}

export default SidebarIconBtn;
