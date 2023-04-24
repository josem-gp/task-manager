import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AuthFormLogin from "./AuthFormLogin";
import AuthFormSignup from "./AuthFormSignup";
import { useLocation } from "react-router-dom";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  // When the user is invited, they will have their email in the form of a query in the URL
  // In that case we want to render the Signup page with the set email by default
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [email, setEmail] = useState<string | null>(searchParams.get("email"));

  useEffect(() => {
    if (searchParams.get("email")) {
      setEmail(searchParams.get("email"));
      setIsLogin(false);
    }
  }, [location]);

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
          <AuthFormSignup setIsLogin={setIsLogin} email={email} />
        )}
      </Grid>
    </>
  );
}

export default AuthForm;
