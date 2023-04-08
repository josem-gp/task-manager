import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import Card from "../card/Card";
import { ElementsTabProps } from "./ElementsTab.types";
import { v4 as uuidv4 } from "uuid";

function ElementsTab({ tabHeaders }: ElementsTabProps) {
  const [tabValue, setTabValue] = useState("1");

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setTabValue(newValue);
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
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
                maxHeight: "500px",
                overflow: "scroll",
              }}
            >
              {element.data.map((el) => (
                <Card key={uuidv4()} type="task" element={el} />
              ))}
            </TabPanel>
          ))}
        </>
      </TabContext>
    </Box>
  );
}

export default ElementsTab;
