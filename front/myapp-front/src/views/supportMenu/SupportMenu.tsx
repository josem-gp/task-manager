import { Box, Stack, TextField, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import ActionBtn from "../../components/actionBtn/ActionBtn";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { filterDates, parseDate } from "../../utils/dateUtils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import { DividedTaskDetails } from "../../types/interfaces";

function SupportMenu() {
  const todaysDate = parseDate();
  // https://www.npmjs.com/package/react-calendar
  const [dateRange, onChange] = useState(() => new Date());
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  // We create this temporary state in order not to make changes to our base state (userState.userTasks)
  const [filteredUserTasks, setFilteredUserTasks] = useState<
    DividedTaskDetails[]
  >([]);

  console.log(filteredUserTasks);

  // In this function we filter the User tasks and update the state
  function handleFilteredUserTasks() {
    const filteredDates = userState.userTasks.filter((el) => {
      return filterDates(dateRange, el.task.due_date);
    });

    setFilteredUserTasks(filteredUserTasks);
  }

  useEffect(() => {
    handleFilteredUserTasks();
  }, [dateRange]);

  return (
    <>
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Navbar showSidebar={false} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          paddingLeft: { xs: "20px", lg: "0" },
          paddingRight: { xs: "20px", lg: "0" },
        }}
      >
        <Box
          // Only show for mobile
          sx={{
            width: "100%",
            display: { xs: "block", md: "none" },
            margin: "0 auto",
            paddingRight: "20px",
            paddingBottom: "20px",
            maxWidth: " 550px",
          }}
        >
          <Typography variant="h5" sx={{ color: "#B5B5B5" }}>
            My Calendar
          </Typography>
        </Box>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <TextField
              variant="standard"
              margin="normal"
              value={todaysDate}
              disabled={true}
              required
              fullWidth
              autoFocus
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                marginTop: "0px",
                marginBottom: "0px",
                input: {
                  WebkitTextFillColor: "#000000 !important",
                  fontWeight: "500",
                  fontSize: "14px",
                },
              }}
            ></TextField>
            <Typography fontSize="36px" fontWeight="bold" color="#f9bb19">
              Today
            </Typography>
          </Box>
          <ActionBtn name="New Task" onClick={() => console.log("clicked")} />
        </Stack>
        <Calendar
          className="react-calendar"
          onChange={onChange}
          value={dateRange}
          locale="en-EN"
          allowPartialRange={true}
          selectRange={true}
        />
        <Stack
          direction="column"
          spacing={1}
          width="100%"
          alignItems="center"
          marginTop="20px"
          maxWidth="350px"
          maxHeight="400px"
          sx={{
            overflow: "scroll",
            padding: "0 10px",
          }}
        >
          Task Hardcoded
        </Stack>
      </Box>
    </>
  );
}

export default SupportMenu;
