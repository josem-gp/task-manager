import { useContext, useEffect } from "react";
import { PopupContext } from "./context/popup/PopupContext";
import Dashboard from "./views/dashboard/Dashboard";
import AuthForm from "./components/authForm/AuthForm";
import { UserContext } from "./context/user/UserContext";
import { User } from "./types/interfaces";
import ActionAlerts from "./components/actionAlerts/ActionAlerts";
import useAxios from "./hooks/useAxios/useAxios";

function App() {
  const { popup, setPopup } = useContext(PopupContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { handleAxiosCall } = useAxios();

  async function fetchUserInfo() {
    const response = await handleAxiosCall<undefined, User>({
      method: "get",
      url: "http://localhost:3000/api/v1/users/fetch_user_info",
      needAuth: true,
    });

    if (response) {
      // To set the user in the context
      userDispatch({
        type: "SET_USER",
        payload: response.data.userObject,
      });
      // To set the user tasks in the context
      userDispatch({
        type: "SET_USER_TASKS",
        payload: response.data.userTasks,
      });
      // To set the user groups in the context
      userDispatch({
        type: "SET_USER_GROUPS",
        payload: response.data.userGroups,
      });
    }
  }

  useEffect(() => {
    if (userState.userAuth) {
      fetchUserInfo();
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
