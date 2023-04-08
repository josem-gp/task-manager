import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ActionBtn from "../../components/actionBtn/ActionBtn";
import ElementsTab from "../../components/elementsTab/ElementsTab";

function GroupsMenu() {
  return (
    <Box
      sx={{
        maxWidth: "550px",
        margin: { xs: "0 auto", md: "0" },
        paddingLeft: { xs: "20px", lg: "80px" },
        paddingRight: { xs: "20px", lg: "80px" },
        paddingTop: "20px",
        paddingBottom: { xs: "80px", md: "0" },
      }}
    >
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
      {/* <ElementsTab /> */}
    </Box>
  );
}

export default GroupsMenu;
