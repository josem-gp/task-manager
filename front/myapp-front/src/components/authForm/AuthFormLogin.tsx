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
import { UserFormDetails, UserResponse } from "../../types/interfaces";
import { AuthFormProps } from "./AuthForm.types";
import { UserContext } from "../../context/user/UserContext";
import useAxios from "../../hooks/useAxios/useAxios";

function AuthFormLogin({ setIsLogin }: AuthFormProps) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const [data, setData] = useState<UserFormDetails>({
    user: { email: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState(false);
  const { handleAxiosCall } = useAxios();

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

  async function handleSubmit() {
    const response = await handleAxiosCall<UserFormDetails, UserResponse>({
      method: "post",
      url: "http://localhost:3000/users/sign_in",
      data: data,
      needAuth: false,
    });

    if (response) {
      const token = response.headers.authorization.split(" ")[1];
      // To set the Cookie
      setAuthToken(token);
      // To set the token in the context
      userDispatch({ type: "SET_USER_AUTH", payload: token });
      // To set the user info in the context
      userDispatch({
        type: "SET_USER",
        payload: response.data.userObject,
      });
    }
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
        onClick={handleSubmit}
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
      <Typography
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
      </Typography>
    </Box>
  );
}

export default AuthFormLogin;
