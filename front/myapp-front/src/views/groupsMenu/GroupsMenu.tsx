import { Box, Stack, Typography } from "@mui/material";
import ElementsTab from "../../components/elementsTab/ElementsTab";
import { useContext, useState } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import ActionModal from "../../components/actionModal/ActionModal";
import { colors } from "../../utils/colors";

function GroupsMenu() {
  const { state: groupState } = useContext(GroupContext);
  const [tabValue, setTabValue] = useState("1");

  const tabHeaders = [
    {
      label: "Members",
      value: "1",
      type: "user" as const,
      data: groupState.groupUsers || [],
    },
    {
      label: "Tags",
      value: "2",
      type: "tag" as const,
      data: groupState.groupTags || [],
    },
    {
      label: "Invitations",
      value: "3",
      type: "invitation" as const,
      data: groupState.groupInvitations || [],
    },
  ];

  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        width="100%"
        alignItems="flex-start"
        marginBottom="40px"
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {groupState.group.name}
        </Typography>
        <Typography variant="h5" sx={{ color: colors.textLight }}>
          {groupState.group.description}
        </Typography>
      </Stack>

      <Box height={40} display="flex" justifyContent="flex-end">
        {(() => {
          switch (tabValue) {
            case "2":
              return (
                <ActionModal
                  type="tag"
                  btnName="New Tag"
                  action="create"
                  setGroup={true}
                  initialData={{
                    tag: {
                      name: "",
                    },
                  }}
                />
              );
            case "3":
              return (
                <ActionModal
                  type="invitation"
                  btnName="New Invitation"
                  action="create"
                  initialData={{
                    invitation: {
                      email: "",
                    },
                  }}
                />
              );
            default:
              return null;
          }
        })()}
      </Box>

      <ElementsTab
        tabHeaders={tabHeaders}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />
    </>
  );
}

export default GroupsMenu;
