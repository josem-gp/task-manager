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
import { AuthFormProps } from "./AuthForm.types";
import { UserContext } from "../../context/user/UserContext";
import useAxios from "../../hooks/useAxios/useAxios";
import { PopupContext } from "../../context/popup/PopupContext";
import { UserAuthRequest } from "../../shared/auth/interfaces";
import useHandleUserAuth from "../../api/auth/useHandleUserAuth";

function AuthFormLogin({ setIsLogin }: AuthFormProps) {
  const { dispatch: userDispatch } = useContext(UserContext);
  const { setPopup } = useContext(PopupContext);
  const [data, setData] = useState<UserAuthRequest>({
    user: { email: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState(false);
  const { handleAxiosCall } = useAxios();
  const { handleUserAuth } = useHandleUserAuth();

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
        Start Planning!
      </Typography>
      <TextField
        required
        id="email"
        label="Email"
        onChange={handleChange}
        name="email"
        value={data.user.email}
        sx={{
          marginBottom: "10px",
        }}
      />
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
            url: `${process.env.REACT_APP_API_URL}/users/sign_in`,
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
        Log in
      </Button>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        textAlign="center"
        onClick={() => setIsLogin(false)}
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
        Don't have an account? Sign up
      </Typography>
      {/* <Typography
        variant="caption"
        display="block"
        gutterBottom
        textAlign="center"
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "#f7b613",
            fontWeight: "600",
          },
        }}
      >
        Forgot your password?
      </Typography> */}
    </Box>
  );
}

export default AuthFormLogin;
