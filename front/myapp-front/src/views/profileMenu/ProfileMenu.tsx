import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UserProfile from "../../components/userProfile/UserProfile";
import UserGroups from "../../components/userGroups/UserGroups";
import ActionModal from "../../components/actionModal/ActionModal";

function ProfileMenu() {
  const [tabValue, setTabValue] = useState("1");

  const tabHeaders = [
    {
      label: "User",
      value: "1",
      component: <UserProfile />,
    },
    {
      label: "My groups",
      value: "2",
      component: <UserGroups />,
    },
  ];

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        My Profile
      </Typography>
      <Box height={40} display="flex" justifyContent="flex-end">
        {tabValue === "2" ? (
          <ActionModal
            type="group"
            btnName="New Group"
            action="create"
            initialData={{
              group: {
                name: "",
                description: "",
              },
            }}
          />
        ) : null}
      </Box>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event: React.SyntheticEvent, newValue: string) => {
              setTabValue(newValue);
            }}
            aria-label="main dashboard tabs"
          >
            {tabHeaders.map((header) => (
              <Tab key={uuidv4()} label={header.label} value={header.value} />
            ))}
          </TabList>
        </Box>
        <>
          {tabHeaders.map((element) => (
            <TabPanel key={element.value} value={element.value}>
              {element.component}
            </TabPanel>
          ))}
        </>
      </TabContext>
    </>
  );
}

export default ProfileMenu;
