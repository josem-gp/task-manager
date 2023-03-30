import React, { useContext, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "../../context/auth/AuthContext";
import { ApiAuthResponse } from "../../types/types";
import { setAuthToken } from "../../utils/setAuthToken";

interface User {
  user: { email: string; password: string };
}

function AuthForm() {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState<User>({
    user: { email: "", password: "" },
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

  function submitData() {
    axios
      .post("http://localhost:3000/users/sign_in", data)
      .then((res: AxiosResponse<ApiAuthResponse>) => {
        const token = res.headers.authorization.split(" ")[1];

        setAuthToken(token);
        authContext.setAuth(token);
      })
      .catch((error) => authContext.setError(error.response.data));
  }

  return (
    <>
      <Grid container spacing={2} textAlign="center">
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            onChange={handleChange}
            name="email"
            value={data.user.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Password"
            variant="filled"
            onChange={handleChange}
            name="password"
            value={data.user.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={submitData}>
            Login
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default AuthForm;
