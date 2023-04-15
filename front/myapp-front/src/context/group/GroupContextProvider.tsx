import { useContext, useEffect, useReducer } from "react";
import { GroupContext, initialState, reducer } from "./GroupContext";
import { UseApiProps } from "../../types/types";
import { UserContext } from "../user/UserContext";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { DividedTaskDetails, Group } from "../../types/interfaces";
import { fetchData } from "../../utils/fetchApiData";
import { ErrorContext } from "../error/ErrorContext";
import { SidebarBtnContext } from "../sidebarBtn/SidebarBtnContext";

type GroupContextProviderProps = {
  children: React.ReactNode;
};

function GroupContextProvider({ children }: GroupContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { error, setError } = useContext(ErrorContext);
  const { selectedGroupId } = useContext(SidebarBtnContext);

  function filterGroupTasks(
    userTasks: DividedTaskDetails[],
    groupId: string
  ): DividedTaskDetails[] {
    return userTasks.filter((t) => t.task.group_id.toString() === groupId);
  }

  function fetchGroupInfo() {
    const params: UseApiProps<undefined> = {
      method: "get",
      url: `http://localhost:3000/api/v1/groups/${selectedGroupId}`,
      headers: {
        Authorization: `Bearer ${userState.userAuth}`,
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
          setError(
            response.response?.statusText as React.SetStateAction<string | null>
          );
        }
      })
      .catch((error: AxiosError) => {
        setError(
          error.response?.statusText as React.SetStateAction<string | null>
        );
      });
  }

  // To update the group tasks based on the userTasks every time there is a change
  useEffect(() => {
    // To set the group tasks in the context
    dispatch({
      type: "SET_GROUP_TASKS",
      payload: filterGroupTasks(userState.userTasks, selectedGroupId),
    });
  }, [userState.userTasks]);

  useEffect(() => {
    if (selectedGroupId) {
      fetchGroupInfo();
    }
  }, [selectedGroupId]);

  return (
    <GroupContext.Provider value={{ state, dispatch }}>
      {children}
    </GroupContext.Provider>
  );
}

export default GroupContextProvider;
