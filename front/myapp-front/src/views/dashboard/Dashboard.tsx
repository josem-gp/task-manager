import { Box, Grid } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import MainMenu from "../mainMenu/MainMenu";
import SupportMenu from "../supportMenu/SupportMenu";
import SidebarBtnContextProvider from "../../context/sidebarBtn/SidebarBtnContextProvider";
import GroupContextProvider from "../../context/group/GroupContextProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function Dashboard() {
  const theme = useTheme();
  // This will be true when the size is md
  // We want to show the sidebar in the navbar ONLY for md size to leave more space for the other two views
  const isMdScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));

  return (
    <>
      <SidebarBtnContextProvider>
        <Box sx={{ display: { lg: "none" } }}>
          {/* To show navbar in md and smaller screens */}
          <Navbar showSidebar={isMdScreen} />
        </Box>
        <Grid container spacing={1} sx={{ padding: "0 20px" }}>
          {!isMdScreen && (
            <Grid item xs={12} lg={2}>
              <Sidebar isVertical={true} />
            </Grid>
          )}
          <GroupContextProvider>
            <Grid item xs={12} md={7} lg={6}>
              <MainMenu />
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <SupportMenu />
            </Grid>
          </GroupContextProvider>
        </Grid>
      </SidebarBtnContextProvider>
    </>
  );
}

export default Dashboard;
