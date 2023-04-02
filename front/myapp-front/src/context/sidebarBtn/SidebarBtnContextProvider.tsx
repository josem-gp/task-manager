import React, { useState } from "react";
import { SidebarBtnContext } from "./SidebarBtnContext";
import { SidebarBtn } from "../../views/sidebar/Sidebar.types";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

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

  const [sidebarBtns, setSidebarBtns] =
    useState<SidebarBtn[]>(initialSidebarBtns);

  return (
    <SidebarBtnContext.Provider value={{ sidebarBtns, setSidebarBtns }}>
      {children}
    </SidebarBtnContext.Provider>
  );
}

export default SidebarBtnContextProvider;
