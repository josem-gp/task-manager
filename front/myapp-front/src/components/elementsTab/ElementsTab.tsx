import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";

function ElementsTab() {
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={"Harcoded"}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            // onChange={handleTabChange}
            aria-label="main dashboard tabs"
          >
            <Tab label="Today" value="1" />
            <Tab label="Upcoming" value="2" />
            <Tab label="Past" value="3" />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            padding: { xs: "24px 10px 0 10px", md: "24px 24px 0 24px" },
            maxHeight: "500px",
            overflow: "scroll",
          }}
        >
          Tasks
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default ElementsTab;
