import { Box, Grid } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import MainMenu from "../mainMenu/MainMenu";
import SupportMenu from "../supportMenu/SupportMenu";
import SidebarBtnProvider from "../../context/sidebarBtn/SidebarBtnProvider";

function Dashboard() {
  return (
    <>
      <Box sx={{ display: { lg: "none" } }}>
        {/* To show in mobile only */}
        <Navbar />
      </Box>
      <SidebarBtnProvider>
        <Grid
          container
          spacing={2}
          sx={{ padding: { sx: "0 20px", lg: "0 4%" } }}
        >
          <Grid item xs={12} md={6} lg={2}>
            <Sidebar />
          </Grid>
          <Grid
            item
            md={6}
            sx={{ display: { xs: "none", md: "block", lg: "none" } }}
          ></Grid>
          <Grid item xs={12} md={6}>
            <MainMenu />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {/* <SupportMenu /> */}
          </Grid>
        </Grid>
      </SidebarBtnProvider>
    </>
  );
}

export default Dashboard;
