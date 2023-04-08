import TasksMenu from "../tasksMenu/TasksMenu";
import GroupsMenu from "../groupsMenu/GroupsMenu";
import ProfileMenu from "../profileMenu/ProfileMenu";
import { useContext } from "react";
import { SidebarBtnContext } from "../../context/sidebarBtn/SidebarBtnContext";

function MainMenu() {
  const { sidebarBtns } = useContext(SidebarBtnContext);

  // It fetches the selectedBtn from the context
  const selectedBtn = sidebarBtns.find((btn) => btn.checked)!.id;

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
