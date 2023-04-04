import { useContext, useEffect, useReducer } from "react";
import { GroupContext, initialState, reducer } from "./GroupContext";
import { UseApiProps } from "../../types/types";
import { UserContext } from "../user/UserContext";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { Group } from "../../types/interfaces";
import { fetchData } from "../../utils/fetchApiData";
import { ErrorContext } from "../error/ErrorContext";
import { SidebarBtnContext } from "../sidebarBtn/SidebarBtnContext";

type GroupContextProviderProps = {
  children: React.ReactNode;
};

function GroupContextProvider({ children }: GroupContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userContext = useContext(UserContext);
  const errorContext = useContext(ErrorContext);
  const sidebarBtnContext = useContext(SidebarBtnContext);

  function fetchGroupInfo() {
    const params: UseApiProps<undefined> = {
      method: "get",
      url: `http://localhost:3000/api/v1/groups/${sidebarBtnContext.selectedGroupId}`,
      headers: {
        Authorization: `Bearer ${userContext.state.userAuth}`,
        "Content-Type": "application/json",
      } as AxiosRequestHeaders,
    };

    fetchData<undefined, Group>(params)
      .then((response: AxiosResponse<Group> | AxiosError) => {
        if ("data" in response) {
          // To set the group in the context
          dispatch({
            type: "SET_GROUP",
            payload: response.data.group,
          });
          // To set the group users in the context
          dispatch({
            type: "SET_GROUP_USERS",
            payload: response.data.groupUsers,
          });
          // To set the group tasks in the context
          dispatch({
            type: "SET_GROUP_TASKS",
            payload: response.data.groupTasks,
          });
          // To set the group tags in the context
          dispatch({
            type: "SET_GROUP_TAGS",
            payload: response.data.groupTags,
          });
          // To set the group invitations in the context
          dispatch({
            type: "SET_GROUP_INVITATIONS",
            payload: response.data.groupInvitations,
          });
        } else {
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
    if (sidebarBtnContext.selectedGroupId) {
      fetchGroupInfo();
    }
  }, [sidebarBtnContext.selectedGroupId]);

  return (
    <GroupContext.Provider value={{ state, dispatch }}>
      {children}
    </GroupContext.Provider>
  );
}

export default GroupContextProvider;
