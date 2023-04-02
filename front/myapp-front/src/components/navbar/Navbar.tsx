import { IconButton, Stack, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        margin: { xs: "10px 40px 40px 40px", sm: "10px 40px 40px 0" },
        justifyContent: { xs: "center", sm: "flex-end" },
      }}
    >
      <Stack direction="row" alignItems="center" marginRight={8}>
        <IconButton>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Typography variant="caption" display="block" lineHeight={0}>
          Hardcoded username
        </Typography>
      </Stack>
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
  );
}

export default Navbar;
