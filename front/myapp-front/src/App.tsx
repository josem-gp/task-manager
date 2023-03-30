import React, { useContext } from "react";
import { AuthContext } from "./context/auth/AuthContext";
import Form from "./components/authForm/AuthForm";
import Group from "./Group";

function App() {
  const authContext = useContext(AuthContext);

  if (authContext.error) {
    return <div>{authContext.error}</div>;
  }

  return <>{!authContext.auth ? <Form /> : <Group />}</>;
}

export default App;
