import { IconButton, Stack, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavbarProps } from "./Navbar.types";
import Sidebar from "../../views/sidebar/Sidebar";

function Navbar({ showSidebar }: NavbarProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        margin: { xs: "10px 40px 40px 40px" },
        justifyContent: { xs: "center", sm: "flex-end", md: "space-between" },
      }}
      alignItems="end"
    >
      {showSidebar && <Sidebar isVertical={false} />}
      <Stack direction="row" alignItems="center">
        <IconButton>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Typography variant="caption" display="block" lineHeight={0}>
          Hardcoded username
        </Typography>
        <IconButton>
          <NotificationsIcon sx={{ color: "#000000" }} />
        </IconButton>
        <IconButton>
          <EmailIcon sx={{ color: "#000000" }} />
        </IconButton>
        <IconButton>
          <ExitToAppIcon sx={{ color: "#000000" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default Navbar;
