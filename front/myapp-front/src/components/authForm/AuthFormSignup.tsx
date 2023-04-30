import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setAuthToken } from "../../utils/setAuthToken";
import { AuthFormSignupProps } from "./AuthForm.types";
import { UserContext } from "../../context/user/UserContext";
import useAxios from "../../hooks/useAxios/useAxios";
import { PopupContext } from "../../context/popup/PopupContext";
import { UserAuthRequest } from "../../shared/auth/interfaces";
import useHandleUserAuth from "../../api/auth/useHandleUserAuth";

function AuthFormSignup({ setIsLogin, email }: AuthFormSignupProps) {
  const { dispatch: userDispatch } = useContext(UserContext);
  const { setPopup } = useContext(PopupContext);
  const [data, setData] = useState<UserAuthRequest>({
    user: {
      username: "",
      email: email || "",
      password: "",
      groups_as_admin_attributes: [
        {
          name: "",
        },
      ],
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const { handleAxiosCall } = useAxios();
  const { handleUserAuth } = useHandleUserAuth();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((prevState) => {
      // We just want to update the nested key if the name is "name" so we need to write that conditional on the side
      let nestedKey = prevState.user.groups_as_admin_attributes;
      if (name === "name" && prevState.user.groups_as_admin_attributes) {
        nestedKey = [
          {
            ...prevState.user.groups_as_admin_attributes[0],
            [name]: value,
          },
        ];
      }
      return {
        user: {
          ...prevState.user,
          ...(name !== "name" && { [name]: value }),
          groups_as_admin_attributes: nestedKey,
        },
      };
    });
  }

  return (
    <Box
      borderRadius="8px"
      display="flex"
      maxWidth="350px"
      flexDirection="column"
      justifyContent="flex-start"
      textAlign="center"
      sx={{
        backgroundColor: "#ffffff",
        padding: { xs: "20px", sm: "64px" },
      }}
      margin="10px"
    >
      <Typography variant="h3" marginBottom="40px">
        Create your new account!
      </Typography>
      <TextField
        required
        id="username"
        label="Username"
        onChange={handleChange}
        name="username"
        value={data.user.username}
        sx={{
          marginBottom: "10px",
        }}
      />
      <TextField
        required
        disabled={email ? true : false}
        id="email"
        label="Email"
        onChange={handleChange}
        name="email"
        value={data.user.email}
        sx={{
          marginBottom: "10px",
        }}
      />
      {!email && (
        <TextField
          required
          disabled={email ? true : false}
          id="group name"
          label="Group name"
          onChange={handleChange}
          name="name"
          value={data.user.groups_as_admin_attributes?.[0].name}
          sx={{
            marginBottom: "10px",
          }}
        />
      )}
      <TextField
        required
        id="password"
        label="Password"
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        name="password"
        value={data.user.password}
        sx={{
          marginBottom: "40px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        onClick={() =>
          handleUserAuth({
            handleAxiosCall,
            data,
            url: `${process.env.REACT_APP_API_URL}/users`,
            setAuthToken,
            userDispatch,
            setPopup,
          })
        }
        sx={{
          color: "#515151",
          fontWeight: "bold",
          backgroundColor: "#f9bb19",
          "&:hover": {
            backgroundColor: "#f7b613",
          },
        }}
      >
        Sign up
      </Button>
      {!email && (
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          textAlign="center"
          onClick={() => setIsLogin(true)}
          sx={{
            marginTop: "20px",
            marginBottom: "10px",
            cursor: "pointer",
            "&:hover": {
              color: "#f7b613",
              fontWeight: "600",
            },
          }}
        >
          Already signed up? Log in
        </Typography>
      )}
    </Box>
  );
}

export default AuthFormSignup;
