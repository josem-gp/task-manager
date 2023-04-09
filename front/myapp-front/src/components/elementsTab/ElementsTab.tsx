import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import { CompoundTabProps } from "./ElementsTab.types";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "../card/TaskCard";
import InvitationCard from "../card/InvitationCard";
import TagCard from "../card/TagCard";
import UserCard from "../card/UserCard";
import {
  DividedTaskDetails,
  DividedUserDetails,
  InvitationDetails,
  TagDetails,
} from "../../types/interfaces";

function ElementsTab({ tabHeaders }: CompoundTabProps) {
  const [tabValue, setTabValue] = useState("1");

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setTabValue(newValue);
  }

  return (
    <TabContext value={tabValue}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleTabChange} aria-label="main dashboard tabs">
          {tabHeaders.map((header) => (
            <Tab key={uuidv4()} label={header.label} value={header.value} />
          ))}
        </TabList>
      </Box>
      <>
        {tabHeaders.map((element) => (
          <TabPanel
            key={uuidv4()}
            value={element.value}
            sx={{
              padding: { xs: "24px 10px 0 10px", md: "24px 24px 0 24px" },
              maxHeight: { md: "30vh", lg: "44vh" },
              overflow: "scroll",
              display: tabValue === element.value ? "grid" : "none",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "10px",
            }}
          >
            {element.data.map((el) => {
              switch (element.type) {
                case "task":
                  return (
                    <TaskCard
                      key={uuidv4()}
                      element={el as DividedTaskDetails}
                    />
                  );
                case "invitation":
                  return (
                    <InvitationCard
                      key={uuidv4()}
                      element={el as InvitationDetails}
                    />
                  );
                case "tag":
                  return <TagCard key={uuidv4()} element={el as TagDetails} />;
                case "user":
                  return (
                    <UserCard
                      key={uuidv4()}
                      element={el as DividedUserDetails}
                    />
                  );
                default:
                  return null;
              }
            })}
          </TabPanel>
        ))}
      </>
    </TabContext>

    // <TabContext value={"3"}>
    //   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    //     <TabList aria-label="lab API tabs example">
    //       <Tab label="Item One" value="1" />
    //       <Tab label="Item Two" value="2" />
    //       <Tab label="Item Three" value="3" />
    //     </TabList>
    //   </Box>
    //   <TabPanel value="1">Item One</TabPanel>
    //   <TabPanel value="2">Item Two</TabPanel>
    //   <TabPanel value="3">Item Three</TabPanel>
    // </TabContext>
  );
}

export default ElementsTab;
