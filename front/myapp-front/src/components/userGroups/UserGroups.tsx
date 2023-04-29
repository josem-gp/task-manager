import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import { Box } from "@mui/material";
import GroupCard from "../card/group/GroupCard";

function UserGroups() {
  const { state: userState } = useContext(UserContext);

  return (
    <Box
      sx={{
        maxHeight: { xs: "60vh", md: "30vh", lg: "68vh" },
        overflow: "scroll",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "10px",
        padding: "24px 24px 0px 24px",
      }}
    >
      {userState.userGroups.map((group) => {
        // User can only see the groups where they are the admin
        if (group.admin_id === userState.userObject.user.id) {
          // return
          return <GroupCard key={group.id} element={group} />;
        }
        return null;
      })}
    </Box>
  );
}

export default UserGroups;
