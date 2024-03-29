import { Box, Stack, TextField, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { filterDates, parseDate } from "../../utils/dateUtils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import TaskCard from "../../components/card/task/TaskCard";
import ActionModal from "../../components/actionModal/ActionModal";
import { TaskObject } from "../../shared/task/interfaces";
import { GroupContext } from "../../context/group/GroupContext";

function SupportMenu() {
  const todaysDate = parseDate();
  // https://www.npmjs.com/package/react-calendar
  const [dateRange, onChange] = useState(() => new Date());
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: groupState } = useContext(GroupContext);
  // We create this temporary state in order not to make changes to our base state (userState.userTasks)
  const [filteredUserTasks, setFilteredUserTasks] = useState<TaskObject[]>(
    userState.userTasks
  );

  // In this function we filter the User tasks and update the state
  function handleFilteredUserTasks() {
    const filteredDates = userState.userTasks.filter((el) => {
      return filterDates(dateRange, el.task.due_date);
    });

    setFilteredUserTasks(filteredDates);
  }

  function taskCardRenderer() {
    return filteredUserTasks.map((el) => (
      <TaskCard key={el.task.id} element={el} />
    ));
  }

  useEffect(() => {
    handleFilteredUserTasks();
  }, [dateRange, userState.userTasks]);

  useEffect(() => {
    taskCardRenderer();
  }, [filteredUserTasks]);

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
          <ActionModal
            type="task"
            btnName="New Task"
            action="create"
            setGroup={false}
            initialData={{
              task: {
                name: "",
                note: "",
                finished: false,
                due_date: "",
                assignee_id: null,
                group_id: groupState.group.id,
                tag_ids: [],
              },
            }}
          />
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
          padding="24px 24px 0px 24px"
          alignItems="center"
          marginTop="20px"
          maxWidth="350px"
          sx={{
            overflow: "scroll",
            padding: "0 10px",
            maxHeight: { xs: "60vh", md: "45vh", lg: "49vh" },
          }}
        >
          {taskCardRenderer()}
        </Stack>
      </Box>
    </>
  );
}

export default SupportMenu;
