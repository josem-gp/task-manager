import {
  Avatar,
  Box,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import ActionBtn from "../../components/actionBtn/ActionBtn";
import { modalStyles } from "../../utils/modalStyles";
import { UserRequest } from "../../shared/user/interfaces";
import { updateUser } from "../../api/user/api";
import { PopupContext } from "../../context/popup/PopupContext";
import useAxios from "../../hooks/useAxios/useAxios";

function ProfileMenu() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const [selectedIconUrl, setSelectedIconUrl] = useState(
    userState.userObject.user_icon.url
  );
  const { setPopup } = useContext(PopupContext);
  const { handleAxiosCall } = useAxios();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState<UserRequest>({
    user: {
      username: userState.userObject.user.username,
      icon_id: userState.userObject.user_icon.id,
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((prevState) => {
      return {
        user: {
          ...prevState.user,
          [name]: value,
        },
      };
    });
  }

  function handleIconChange(url: string, id: number) {
    setSelectedIconUrl(url);
    setData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        icon_id: id,
      },
    }));

    // Close the modal
    handleClose();
  }

  function handleUserUpdate() {
    updateUser(
      {
        userState,
        userDispatch,
        setPopup,
        handleAxiosCall,
      },
      data
    );

    // Set data back to initial state so that password dont show
    setData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        current_password: "",
        password: "",
        password_confirmation: "",
      },
    }));
  }

  return (
    <>
      <Typography variant="h4" margin="50px 0" sx={{ fontWeight: "bold" }}>
        My Profile
      </Typography>
      <Box maxWidth="400px">
        <Modal open={open} onClose={handleClose}>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            gap="10px"
            sx={modalStyles}
          >
            {userState.allIcons.map((icon) => (
              <Avatar
                key={icon.id}
                src={icon.url}
                alt={icon.name}
                sx={{ width: 60, height: 60, cursor: "pointer" }}
                onClick={() => handleIconChange(icon.url, icon.id)}
              />
            ))}
          </Box>
        </Modal>
        <Avatar
          src={selectedIconUrl}
          alt="User's profile picture"
          sx={{
            width: 80,
            height: 80,
            marginBottom: "40px",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        />
        <TextField
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          name="username"
          value={data.user.username}
          sx={{
            marginBottom: "30px",
          }}
        />
        <TextField
          fullWidth
          disabled
          id="email"
          label="Email"
          name="email"
          value={userState.userObject.user.email}
          sx={{
            marginBottom: "30px",
          }}
        />
        <TextField
          required
          id="current password"
          label="Current Password"
          onChange={handleChange}
          type="password"
          name="current_password"
          value={data.user.current_password}
          sx={{
            marginBottom: "30px",
          }}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            required
            id="password"
            label="New Password"
            onChange={handleChange}
            type="password"
            name="password"
            value={data.user.password}
          />
          <TextField
            required
            id="new password confirmation"
            label="New Password Confirmation"
            onChange={handleChange}
            type="password"
            name="password_confirmation"
            value={data.user.password_confirmation}
          />
        </Stack>
        <Box
          sx={{
            float: "right",
            marginTop: "30px",
          }}
        >
          <ActionBtn name="Update" onClick={handleUserUpdate} />
        </Box>
      </Box>
    </>
  );
}

export default ProfileMenu;
