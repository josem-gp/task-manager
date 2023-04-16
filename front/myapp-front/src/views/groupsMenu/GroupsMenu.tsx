import { Box, Stack, Typography } from "@mui/material";
import ElementsTab from "../../components/elementsTab/ElementsTab";
import { useContext, useState } from "react";
import { GroupContext } from "../../context/group/GroupContext";
import { UserContext } from "../../context/user/UserContext";
import ActionModal from "../../components/actionModal/ActionModal";

function GroupsMenu() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const [onTagFocus, setOnTagFocus] = useState(false);

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
      <Typography variant="h5" sx={{ color: "#B5B5B5" }}>
        Hello, {userState.userObject.user.username}!
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        width="100%"
        alignItems="center"
        marginBottom="40px"
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Welcome to {groupState.group.name}
        </Typography>
      </Stack>

      <Box height={40} display="flex" justifyContent="flex-end">
        {onTagFocus && (
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
        )}
      </Box>

      <ElementsTab tabHeaders={tabHeaders} setOnTagFocus={setOnTagFocus} />
    </>
  );
}

export default GroupsMenu;
