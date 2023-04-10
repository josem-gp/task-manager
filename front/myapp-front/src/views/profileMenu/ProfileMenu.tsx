import { Avatar, Box, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import { UserFormDetails } from "../../types/interfaces";
import { fetchIconUrl } from "../../utils/fetchUserIcon";

function ProfileMenu() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const [data, setData] = useState<UserFormDetails>({
    user: {
      username: userState.userObject.user.username,
      email: userState.userObject.user.email,
      password: "",
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

  return (
    <>
      <Typography variant="h4" margin="50px 0" sx={{ fontWeight: "bold" }}>
        My Profile
      </Typography>
      <Box maxWidth="400px">
        <Avatar
          src={userState.userObject.user_icon.url}
          alt="User's profile picture"
          sx={{ width: 80, height: 80, marginBottom: "40px" }}
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
          id="email"
          label="Email"
          onChange={handleChange}
          name="email"
          value={data.user.email}
          sx={{
            marginBottom: "30px",
          }}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            required
            id="old password"
            label="Old Password"
            onChange={handleChange}
            type="password"
            name="password" // this should change to old_password (check Api forgot password logic)
            value={data.user.password}
          />
          <TextField
            required
            id="new password"
            label="New Password"
            onChange={handleChange}
            type="password"
            name="password" // this should change to new_password (check Api forgot password logic)
            value={data.user.password}
          />
        </Stack>
      </Box>
    </>
  );
}

export default ProfileMenu;
