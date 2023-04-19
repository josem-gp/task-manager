import { useContext, useEffect } from "react";
import { PopupContext } from "./context/popup/PopupContext";
import Dashboard from "./views/dashboard/Dashboard";
import AuthForm from "./components/authForm/AuthForm";
import { UserContext } from "./context/user/UserContext";
import ActionAlerts from "./components/actionAlerts/ActionAlerts";
import useAxios from "./hooks/useAxios/useAxios";
import { fetchUserInfo } from "./api/user/api";

function App() {
  const { popup } = useContext(PopupContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { handleAxiosCall } = useAxios();

  useEffect(() => {
    if (userState.userAuth) {
      fetchUserInfo(handleAxiosCall, userDispatch);
    }
  }, [userState.userAuth]);

  return (
    <>
      {popup.message && <ActionAlerts severity="error" />}
      {!userState.userAuth ? <AuthForm /> : <Dashboard />}
    </>
  );
}

export default App;
