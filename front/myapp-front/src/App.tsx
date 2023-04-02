import React, { useContext } from "react";
import { AuthContext } from "./context/auth/AuthContext";
import Dashboard from "./views/dashboard/Dashboard";
import AuthForm from "./components/authForm/AuthForm";

function App() {
  const authContext = useContext(AuthContext);

  if (authContext.error) {
    return <div>{authContext.error}</div>;
  }

  return <>{!authContext.auth ? <AuthForm /> : <Dashboard />}</>;
}

export default App;
