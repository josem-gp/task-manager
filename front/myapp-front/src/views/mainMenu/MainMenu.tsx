import TasksMenu from "../tasksMenu/TasksMenu";
import GroupsMenu from "../groupsMenu/GroupsMenu";
import ProfileMenu from "../profileMenu/ProfileMenu";
import { useContext } from "react";
import { SidebarBtnContext } from "../../context/sidebarBtn/SidebarBtnContext";

function MainMenu() {
  const sidebarBtnContext = useContext(SidebarBtnContext);
  // It fetched the selectedBtn from the context
  const selectedBtn = sidebarBtnContext.sidebarBtns.find(
    (btn) => btn.checked
  )!.id;

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
