import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useContext } from "react";
import { CompoundTabProps } from "./ElementsTab.types";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "../card/task/TaskCard";
import InvitationCard from "../card/invitation/InvitationCard";
import TagCard from "../card/tag/TagCard";
import UserCard from "../card/user/UserCard";
import { UserContext } from "../../context/user/UserContext";
import { GroupContext } from "../../context/group/GroupContext";
import { Invitation } from "../../shared/invitation/interfaces";
import { TaskObject } from "../../shared/task/interfaces";
import { Tag } from "../../shared/tag/interfaces";
import { UserObject } from "../../shared/user/interfaces";

function ElementsTab({ tabHeaders, tabValue, setTabValue }: CompoundTabProps) {
  const { state: userState } = useContext(UserContext);
  const { state: groupState } = useContext(GroupContext);

  return (
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
        <>
          {tabHeaders.map((element) =>
            element.type === "invitation" &&
            userState.userObject.user.id !== groupState.group.admin_id ? (
              <TabPanel key={uuidv4()} value={element.value}>
                {/* If user is not admin of group they won't be able to see
                anything since it is already filtered in the server side. But
                we might as well show some kind of message to the user */}
                <Box>
                  <Typography>
                    You have no authorization to see this content
                  </Typography>
                </Box>
              </TabPanel>
            ) : (
              <TabPanel
                key={uuidv4()}
                value={element.value}
                sx={{
                  maxHeight:
                    element.type === "task"
                      ? { xs: "60vh", md: "57vh", lg: "68vh" }
                      : { xs: "60vh", md: "61vh", lg: "72vh" },
                  padding: "24px 24px 0px 24px",
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
                        <TaskCard key={uuidv4()} element={el as TaskObject} />
                      );
                    case "invitation":
                      if (
                        userState.userObject.user.id ===
                        groupState.group.admin_id
                      ) {
                        return (
                          <InvitationCard
                            key={uuidv4()}
                            element={el as Invitation}
                          />
                        );
                      } else {
                        return null;
                      }
                    case "tag":
                      return <TagCard key={uuidv4()} element={el as Tag} />;
                    case "user":
                      return (
                        <UserCard key={uuidv4()} element={el as UserObject} />
                      );
                    default:
                      return null;
                  }
                })}
              </TabPanel>
            )
          )}
        </>
      </>
    </TabContext>
  );
}

export default ElementsTab;
