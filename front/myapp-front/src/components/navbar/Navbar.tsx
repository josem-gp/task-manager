import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavbarProps } from "./Navbar.types";
import Sidebar from "../../views/sidebar/Sidebar";
import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import useHandleUserAuth from "../../api/auth/useHandleUserAuth";
import { GroupContext } from "../../context/group/GroupContext";
import useAxios from "../../hooks/useAxios/useAxios";
import { PopupContext } from "../../context/popup/PopupContext";

function Navbar({ showSidebar }: NavbarProps) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { dispatch: groupDispatch } = useContext(GroupContext);
  const { handleAxiosCall } = useAxios();
  const { setPopup } = useContext(PopupContext);
  const { handleUserLogOut } = useHandleUserAuth();

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
        <Avatar
          src={userState.userObject.user_icon.url}
          alt="User's profile picture"
          sx={{
            width: 35,
            height: 35,
          }}
        />
        <Typography
          variant="caption"
          display="block"
          lineHeight={0}
          marginLeft={1}
        >
          {userState.userObject.user.username}
        </Typography>
        {/* <IconButton>
          <NotificationsIcon sx={{ color: "#000000" }} />
        </IconButton> */}
        <IconButton
          onClick={() =>
            handleUserLogOut({
              handleAxiosCall,
              userDispatch,
              groupDispatch,
              setPopup,
            })
          }
        >
          <ExitToAppIcon sx={{ color: "#000000" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default Navbar;
