import { useState } from "react";
import { Grid } from "@mui/material";
import AuthFormLogin from "./AuthFormLogin";
import AuthFormSignup from "./AuthFormSignup";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Grid
        container
        className="homepage-main-grid"
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundColor: "#06083d",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {isLogin ? (
          <AuthFormLogin setIsLogin={setIsLogin} />
        ) : (
          <AuthFormSignup setIsLogin={setIsLogin} />
        )}
      </Grid>
    </>
  );
}

export default AuthForm;
