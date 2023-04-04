import TasksMenu from "../tasksMenu/TasksMenu";
import GroupsMenu from "../groupsMenu/GroupsMenu";
import ProfileMenu from "../profileMenu/ProfileMenu";
import { useContext, useEffect } from "react";
import { SidebarBtnContext } from "../../context/sidebarBtn/SidebarBtnContext";
import { GroupContext } from "../../context/group/GroupContext";
import { UseApiProps } from "../../types/types";
import { UserContext } from "../../context/user/UserContext";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { fetchData } from "../../utils/fetchApiData";
import { Group } from "../../types/interfaces";
import { ErrorContext } from "../../context/error/ErrorContext";

function MainMenu() {
  const sidebarBtnContext = useContext(SidebarBtnContext);
  const userContext = useContext(UserContext);
  const errorContext = useContext(ErrorContext);
  const { state, dispatch } = useContext(GroupContext);

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

  // It fetches the selectedBtn from the context
  const selectedBtn = sidebarBtnContext.sidebarBtns.find(
    (btn) => btn.checked
  )!.id;

  // It renders the component depending on the selectedBtn that comes from sidebar
  function getSelectedComponent() {
    switch (selectedBtn) {
      case 1:
        return <TasksMenu />;
      case 2:
        return <GroupsMenu />;
      case 3:
        return <ProfileMenu />;
      default:
        return null;
    }
  }

  return <>{getSelectedComponent()}</>;
}

export default MainMenu;
