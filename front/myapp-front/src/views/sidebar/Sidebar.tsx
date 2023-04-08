import { Stack } from "@mui/material";
import SidebarIconBtn from "../../components/sidebarIconBtn/SidebarIconBtn";
import { ElementSelect as GroupSelect } from "../../components/elementSelect/ElementSelect";
import { useContext } from "react";
import { SidebarBtnContext } from "../../context/sidebarBtn/SidebarBtnContext";
import { UserContext } from "../../context/user/UserContext";

function Sidebar() {
  const { setSidebarBtns, sidebarBtns, selectedGroupId, setSelectedGroupId } =
    useContext(SidebarBtnContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

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
      <GroupSelect
        name="Choose a group"
        elements={userState.userGroups}
        elementId={selectedGroupId}
        setElementId={(id: string) => setSelectedGroupId(id)}
      />
    </Stack>
  );
}

export default Sidebar;
