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
import { ErrorContext } from "../../context/error/ErrorContext";
import { setAuthToken } from "../../utils/setAuthToken";
import { UserFormDetails, UserResponse } from "../../types/interfaces";
import { AuthFormProps } from "./AuthForm.types";
import { fetchData } from "../../utils/fetchApiData";
import { UseApiProps } from "../../types/types";
import { AxiosError, AxiosResponse } from "axios";
import { UserContext } from "../../context/user/UserContext";

function AuthFormSignup({ setIsLogin }: AuthFormProps) {
  const { state, dispatch } = useContext(UserContext);
  const errorContext = useContext(ErrorContext);
  const [data, setData] = useState<UserFormDetails>({
    user: { username: "", email: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState(false);

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

  function handleSubmit() {
    const params: UseApiProps<UserFormDetails> = {
      method: "post",
      url: "http://localhost:3000/users",
      data: data,
    };

    fetchData<UserFormDetails, UserResponse>(params)
      .then((response: AxiosResponse<UserResponse> | AxiosError) => {
        if ("headers" in response) {
          const token = response.headers.authorization.split(" ")[1];
          // To set the Cookie
          setAuthToken(token);
          // To set the token in the context
          dispatch({ type: "SET_USER_AUTH", payload: token });
          // To set the user info in the context
          dispatch({ type: "SET_USER", payload: response.data.user });
        } else {
          errorContext.setError(
            response.response?.data as React.SetStateAction<string | null>
          );
        }
      })
      .catch((error: AxiosError) => {
        errorContext.setError(
          error.response?.data as React.SetStateAction<string | null>
        );
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
        Sign up
      </Button>
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
    </Box>
  );
}

export default AuthFormSignup;
