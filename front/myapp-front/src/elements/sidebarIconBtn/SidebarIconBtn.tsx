import { Button } from "@mui/material";

function SidebarIconBtn() {
  return (
    <Button
      name="profile"
      // variant={selectedBtn === "profile" ? "contained" : ""}
      // startIcon={<SettingsIcon />}
      // onClick={dynamicButtonStyle}
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
      Test Name
    </Button>
  );
}

export default SidebarIconBtn;
