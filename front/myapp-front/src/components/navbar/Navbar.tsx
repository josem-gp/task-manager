import { IconButton, Stack, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavbarProps } from "./Navbar.types";
import Sidebar from "../../views/sidebar/Sidebar";
import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";

function Navbar({ showSidebar }: NavbarProps) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        margin: { xs: "10px 40px 15px 40px" },
        justifyContent: {
          xs: "center",
          sm: "flex-end",
          md: "space-between",
          lg: "flex-end",
        },
      }}
      alignItems="end"
    >
      {showSidebar && <Sidebar isVertical={false} />}
      <Stack direction="row" alignItems="center">
        <IconButton>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Typography variant="caption" display="block" lineHeight={0}>
          {userState.userObject.user.username}
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
