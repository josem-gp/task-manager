import { Box, Stack } from "@mui/material";
import SidebarIconBtn from "../../components/sidebarIconBtn/SidebarIconBtn";
import { ElementSelect } from "../../components/elementSelect/ElementSelect";
import { useContext } from "react";
import { SidebarBtnContext } from "../../context/sidebarBtn/SidebarBtnContext";
import { UserContext } from "../../context/user/UserContext";
import { SidebarProps } from "./Sidebar.types";

function Sidebar({ isVertical }: SidebarProps) {
  const { setSidebarBtns, sidebarBtns, selectedGroupId, setSelectedGroupId } =
    useContext(SidebarBtnContext);
  const { state: userState } = useContext(UserContext);

  function handleSidebarIconBtn(id: number) {
    setSidebarBtns((prevState) =>
      prevState.map((btn) =>
        btn.id === id ? { ...btn, checked: true } : { ...btn, checked: false }
      )
    );
  }

  if (isVertical) {
    return (
      <Stack
        justifyContent="space-between"
        sx={{
          height: { xs: "auto", md: "100vh" },
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
              onlyIcon={false}
            />
          ))}
        </Stack>
        <Box marginBottom="10px">
          <ElementSelect
            name="Choose a group"
            elements={userState.userGroups}
            elementId={selectedGroupId}
            setElementId={(id: number) => setSelectedGroupId(id.toString())}
          />
        </Box>
      </Stack>
    );
  } else {
    return (
      <Stack direction="row" alignItems="center" spacing={3}>
        <Stack direction="row" sx={{ transform: "translateY(10px)" }}>
          {sidebarBtns.map((el) => (
            <SidebarIconBtn
              key={el.id}
              name={el.name}
              icon={el.icon}
              checked={el.checked}
              onClick={() => handleSidebarIconBtn(el.id)}
              onlyIcon={true}
            />
          ))}
        </Stack>
        <Box marginBottom="10px">
          <ElementSelect
            name="Choose a group"
            elements={userState.userGroups}
            elementId={selectedGroupId}
            setElementId={(id: number) => setSelectedGroupId(id.toString())}
          />
        </Box>
      </Stack>
    );
  }
}

export default Sidebar;
