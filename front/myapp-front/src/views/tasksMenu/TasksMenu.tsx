import { Box, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilterTasks from "../../components/filterBar/FilterBar";
import ElementsTab from "../../components/elementsTab/ElementsTab";

function TasksMenu() {
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
        Hello, Hardcoded Jose!
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        width="100%"
        alignItems="center"
        marginBottom="60px"
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          You've got 0 hardcoded tasks today
        </Typography>
        <CalendarMonthIcon fontSize="large" />
      </Stack>
      {/* <FilterTasks /> */}
      <Typography
        variant="h4"
        marginTop="60px"
        marginBottom="40px"
        sx={{ fontWeight: "bold" }}
      >
        My tasks
      </Typography>
      <ElementsTab />
    </Box>
  );
}

export default TasksMenu;
