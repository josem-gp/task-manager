import { Stack } from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import IconBtn from "../../elements/sidebarIconBtn/SidebarIconBtn";
import GroupSelect from "../../elements/elementSelect/ElementSelect";

function Sidebar() {
  return (
    <Stack
      justifyContent="space-between"
      sx={{
        height: { xs: "auto", lg: "100vh" },
        maxWidth: "300px",
        margin: { xs: "0 auto", md: "0" },
        paddingLeft: { xs: "20px", lg: "0" },
        paddingRight: { xs: "20px", lg: "0" },
      }}
    >
      <Stack spacing={4} sx={{ paddingTop: { xs: "0", lg: "120px" } }}>
        <IconBtn />
      </Stack>
      <GroupSelect />
    </Stack>
  );
}

export default Sidebar;
