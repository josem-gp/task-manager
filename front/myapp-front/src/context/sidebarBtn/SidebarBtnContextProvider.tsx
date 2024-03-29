import React, { useContext, useEffect, useState } from "react";
import { SidebarBtnContext } from "./SidebarBtnContext";
import { SidebarBtn } from "../../views/sidebar/Sidebar.types";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import { UserContext } from "../user/UserContext";

type SidebarBtnContextProviderProps = {
  children: React.ReactNode;
};

function SidebarBtnContextProvider({
  children,
}: SidebarBtnContextProviderProps) {
  const initialSidebarBtns: SidebarBtn[] = [
    {
      id: 1,
      name: "Dashboard",
      icon: <DashboardCustomizeIcon />,
      checked: true,
    },
    {
      id: 2,
      name: "Groups",
      icon: <GroupsIcon />,
      checked: false,
    },
    {
      id: 3,
      name: "Profile",
      icon: <SettingsIcon />,
      checked: false,
    },
  ];

  const { state } = useContext(UserContext);

  function defaultGroup() {
    setSelectedGroupId(state.userGroups[0].id.toString());
  }

  const [sidebarBtns, setSidebarBtns] =
    useState<SidebarBtn[]>(initialSidebarBtns);

  // Left selectedGroupId as a string because it is easier to handle an initial empty string
  // in a MUI Select Component
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  // This Use Effect will run once there is some userGroup available and will put the first one as a default
  // so we can show the tasks from that group in the MainMenu of the Dashboard
  useEffect(() => {
    // We double-check that the array of userGroups is not empty.
    // If not it will throw error in runtime when trying to fetch the id of the first element in the array
    if (state.userGroups.length > 0) {
      defaultGroup();
    }
  }, [state.userGroups]);

  return (
    <SidebarBtnContext.Provider
      value={{
        sidebarBtns,
        setSidebarBtns,
        selectedGroupId,
        setSelectedGroupId,
      }}
    >
      {children}
    </SidebarBtnContext.Provider>
  );
}

export default SidebarBtnContextProvider;
