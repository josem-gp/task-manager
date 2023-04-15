import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useContext, useState } from "react";
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
import { UserContext } from "../../context/user/UserContext";
import { GroupContext } from "../../context/group/GroupContext";

function ElementsTab({ tabHeaders }: CompoundTabProps) {
  const [tabValue, setTabValue] = useState("1");
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: groupState } = useContext(GroupContext);

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
                  if (
                    userState.userObject.user.id === groupState.group.admin_id
                  ) {
                    return (
                      <InvitationCard
                        key={uuidv4()}
                        element={el as InvitationDetails}
                      />
                    );
                  } else {
                    // If user is not admin of group they won't be able to see anything since it is already
                    // filtered in the server side. But we might as well show some kind of message to the user
                    return (
                      <Box>
                        <Typography>
                          You have no authorization to see this content
                        </Typography>
                      </Box>
                    );
                  }
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
  );
}

export default ElementsTab;
