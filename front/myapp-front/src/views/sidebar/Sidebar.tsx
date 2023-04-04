import { Stack } from "@mui/material";
import SidebarIconBtn from "../../components/sidebarIconBtn/SidebarIconBtn";
import { ElementSelect as GroupSelect } from "../../components/elementSelect/ElementSelect";
import { useContext } from "react";
import { SidebarBtnContext } from "../../context/sidebarBtn/SidebarBtnContext";
import { UserContext } from "../../context/user/UserContext";

function Sidebar() {
  const sidebarBtnContext = useContext(SidebarBtnContext);
  const userContext = useContext(UserContext);

  function handleSidebarIconBtn(id: number) {
    sidebarBtnContext.setSidebarBtns((prevState) =>
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
        {sidebarBtnContext.sidebarBtns.map((el) => (
          <SidebarIconBtn
            key={el.id}
            name={el.name}
            icon={el.icon}
            checked={el.checked}
            onClick={() => handleSidebarIconBtn(el.id)}
          />
        ))}
      </Stack>
      <GroupSelect
        elements={userContext.state.userGroups}
        elementId={sidebarBtnContext.selectedGroupId}
        setElementId={(id: string) => sidebarBtnContext.setSelectedGroupId(id)}
      />
    </Stack>
  );
}

export default Sidebar;
