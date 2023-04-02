import React, { useContext, useEffect } from "react";
import { ErrorContext } from "./context/error/ErrorContext";
import Dashboard from "./views/dashboard/Dashboard";
import AuthForm from "./components/authForm/AuthForm";
import { UserContext } from "./context/user/UserContext";
import { fetchData } from "./utils/fetchApiData";
import { User } from "./types/interfaces";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { UseApiProps } from "./types/types";

function App() {
  const errorContext = useContext(ErrorContext);
  const { state, dispatch } = useContext(UserContext);

  console.log(state);

  function fetchUserInfo() {
    const params: UseApiProps<undefined> = {
      method: "get",
      url: `http://localhost:3000/api/v1/users/${state.user?.id}/fetch_user_info`,
      headers: {
        Authorization: `Bearer ${state.userAuth}`,
        "Content-Type": "application/json",
      } as AxiosRequestHeaders,
    };

    fetchData<undefined, User>(params)
      .then((response: AxiosResponse<User> | AxiosError) => {
        if ("data" in response) {
          // To set the user tasks in the context
          dispatch({
            type: "SET_USER_TASKS",
            payload: response.data.userTasks,
          });
          // To set the user groups in the context
          dispatch({
            type: "SET_USER_GROUPS",
            payload: response.data.userGroups,
          });
        } else {
          console.log("ERROR", response);
          errorContext.setError(
            response.response?.statusText as React.SetStateAction<string | null>
          );
        }
      })
      .catch((error: AxiosError) => {
        errorContext.setError(
          error.response?.statusText as React.SetStateAction<string | null>
        );
      });
  }

  useEffect(() => {
    if (state.userAuth) {
      fetchUserInfo();
    }
  }, [state.userAuth]);

  if (errorContext.error) {
    return <div>{errorContext.error}</div>;
  }

  return <>{!state.userAuth ? <AuthForm /> : <Dashboard />}</>;
}

export default App;
