import { Stack } from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import SidebarIconBtn from "../../components/sidebarIconBtn/SidebarIconBtn";
import GroupSelect from "../../components/elementSelect/ElementSelect";
import { SidebarBtn } from "./Sidebar.types";
import { useState } from "react";

function Sidebar() {
  const initialSidebarBtns: SidebarBtn[] = [
    {
      id: 1,
      name: "Dashboard",
      icon: <DashboardCustomizeIcon />,
      checked: true,
    },
    { id: 2, name: "Groups", icon: <GroupsIcon />, checked: false },
    { id: 3, name: "Profile", icon: <SettingsIcon />, checked: false },
  ];

  const [sidebarBtns, setSidebarBtns] =
    useState<SidebarBtn[]>(initialSidebarBtns);

  function handleSidebarIconBtn(id: number) {
    setSidebarBtns((prevState) =>
      prevState.map((btn) =>
        btn.id === id ? { ...btn, checked: true } : { ...btn, checked: false }
      )
    );
  }

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        height: { xs: "auto", lg: "100vh" },
        maxWidth: "300px",
        margin: { xs: "0 auto", md: "0" },
        paddingLeft: { xs: "20px", lg: "0" },
        paddingRight: { xs: "20px", lg: "0" },
      }}
    >
      <Stack spacing={4} sx={{ paddingTop: { xs: "0", lg: "120px" } }}>
        {sidebarBtns.map((el) => (
          <SidebarIconBtn
            key={el.id}
            name={el.name}
            icon={el.icon}
            checked={el.checked}
            onClick={() => handleSidebarIconBtn(el.id)}
          />
        ))}
      </Stack>
      <GroupSelect />
    </Stack>
  );
}

export default Sidebar;
