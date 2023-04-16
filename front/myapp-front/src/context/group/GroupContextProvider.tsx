import { useContext, useEffect, useReducer } from "react";
import { GroupContext, initialState, reducer } from "./GroupContext";
import { UserContext } from "../user/UserContext";
import { DividedTaskDetails, Group } from "../../types/interfaces";
import { SidebarBtnContext } from "../sidebarBtn/SidebarBtnContext";
import useAxios from "../../hooks/useAxios/useAxios";

type GroupContextProviderProps = {
  children: React.ReactNode;
};

function GroupContextProvider({ children }: GroupContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { selectedGroupId } = useContext(SidebarBtnContext);
  const { handleAxiosCall } = useAxios();

  // From all the userTasks, filter those that belong to the group that was selected
  function filterGroupTasks(
    userTasks: DividedTaskDetails[],
    groupId: string
  ): DividedTaskDetails[] {
    return userTasks.filter((t) => t.task.group_id.toString() === groupId);
  }

  // Fetch Group info from the API
  async function fetchGroupInfo() {
    const response = await handleAxiosCall<undefined, Group>({
      method: "get",
      url: `http://localhost:3000/api/v1/groups/${selectedGroupId}`,
      needAuth: true,
    });

    if (response) {
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
    }
  }

  // To update the group tasks based on the userTasks every time there is a change
  useEffect(() => {
    // To set the group tasks in the context
    dispatch({
      type: "SET_GROUP_TASKS",
      payload: filterGroupTasks(userState.userTasks, selectedGroupId),
    });
  }, [userState.userTasks, selectedGroupId]);

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
