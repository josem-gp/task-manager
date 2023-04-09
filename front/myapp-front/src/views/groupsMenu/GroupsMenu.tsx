import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ActionBtn from "../../components/actionBtn/ActionBtn";
import ElementsTab from "../../components/elementsTab/ElementsTab";
import { useContext } from "react";
import { GroupContext } from "../../context/group/GroupContext";

function GroupsMenu() {
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);

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
        Hello, Harcoded Jose!
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        width="100%"
        alignItems="center"
        marginBottom="60px"
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Welcome to Harcoded Group
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Typography
          variant="h4"
          marginTop="60px"
          marginBottom="40px"
          sx={{ fontWeight: "bold" }}
        >
          My Group
        </Typography>
        {/* <ActionBtn /> */}
      </Stack>
      <ElementsTab tabHeaders={tabHeaders} />
    </>
  );
}

export default GroupsMenu;
