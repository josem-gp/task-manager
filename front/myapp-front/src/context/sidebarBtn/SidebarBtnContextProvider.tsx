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
    // We use ! because we know this function will run only if state.useGroups is truthy
    setSelectedGroupId(state.userGroups![0].id.toString());
  }

  const [sidebarBtns, setSidebarBtns] =
    useState<SidebarBtn[]>(initialSidebarBtns);

  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  // This Use Effect will run once there is some userGroup available and will put the first one as a default
  // so we can show the tasks from that group in the MainMenu of the Dashboard
  useEffect(() => {
    if (state.userGroups) {
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
