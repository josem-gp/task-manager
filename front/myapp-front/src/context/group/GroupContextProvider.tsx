import { useContext, useEffect, useReducer } from "react";
import { GroupContext, initialState, reducer } from "./GroupContext";
import { UserContext } from "../user/UserContext";
import { SidebarBtnContext } from "../sidebarBtn/SidebarBtnContext";
import useAxios from "../../hooks/useAxios/useAxios";
import { TaskObject } from "../../shared/task/interfaces";
import { fetchGroupInfo } from "../../api/group/api";

type GroupContextProviderProps = {
  children: React.ReactNode;
};

function GroupContextProvider({ children }: GroupContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: userState } = useContext(UserContext);
  const { selectedGroupId } = useContext(SidebarBtnContext);
  const { handleAxiosCall } = useAxios();

  // From all the userTasks, filter those that belong to the group that was selected
  function filterGroupTasks(
    userTasks: TaskObject[],
    groupId: string
  ): TaskObject[] {
    return userTasks.filter((t) => t.task.group_id.toString() === groupId);
  }

  // To update the group tasks based on the userTasks every time there is a change
  useEffect(() => {
    if (selectedGroupId) {
      // To set the group tasks in the context
      dispatch({
        type: "SET_GROUP_TASKS",
        payload: filterGroupTasks(userState.userTasks, selectedGroupId),
      });
    }
  }, [userState.userTasks, selectedGroupId]);

  useEffect(() => {
    if (selectedGroupId) {
      fetchGroupInfo({
        handleAxiosCall,
        dispatch,
        selectedGroupId,
      });
    }
  }, [selectedGroupId]);

  return (
    <GroupContext.Provider value={{ state, dispatch }}>
      {children}
    </GroupContext.Provider>
  );
}

export default GroupContextProvider;
