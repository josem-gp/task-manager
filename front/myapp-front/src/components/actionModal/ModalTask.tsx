import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers";
import { CardModalProps } from "./ActionModal.types";
import { useState } from "react";
import { TaskFormDetails } from "../../types/interfaces";

function ModalTask({ action }: CardModalProps) {
  const [formAction, setFormAction] = useState(action);
  const isShow = formAction === "show";
  const isCreate = formAction === "create";
  const isEdit = formAction === "edit";
  const [data, setData] = useState<TaskFormDetails>({
    task: {
      name: "",
      note: "",
      finished: false,
      due_date: "",
      assignee_id: 0,
      group_id: 0,
      tag_ids: [],
    },
  });

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" component="h2">
          {isShow
            ? "Check your task"
            : isEdit
            ? "Edit your task"
            : "Create a task"}
        </Typography>
        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          justifyContent="space-between"
        >
          {isShow && (
            <>
              <IconButton
                onClick={() => {
                  setFormAction("edit");
                }}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                // onClick={() => handleTaskDelete()}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Stack>
      </Stack>
      <TextField
        disabled={isShow ? true : undefined}
        id="name"
        label="Name"
        // onChange={handleChange}
        name="name"
        value={data.task.name}
        sx={{
          marginBottom: "10px",
          marginTop: "30px",
          width: "225px",
        }}
      />

      {/* <Box sx={{ width: 225, marginBottom: "10px" }}>
        {userTasks.status === "show" ? (
          <FormControl fullWidth disabled>
            <InputLabel
              id="multiple-checkbox"
              sx={{
                background: "white",
                paddingRight: "6px",
              }}
            >
              Tags
            </InputLabel>
            <Select
              labelId="multiple-checkbox"
              id="multiple-checkbox"
              multiple
              name="selectedTags"
              value={taskCard.selectedTags}
              onChange={handleSelectPartner}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {taskCard.possibleTags &&
                taskCard.possibleTags.map((name) => (
                  <MenuItem key={name[0]} value={name[1]}>
                    <Checkbox
                      checked={taskCard.selectedTags.indexOf(name[1]) > -1}
                    />
                    <ListItemText primary={name[1]} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <InputLabel
              id="multiple-checkbox"
              sx={{
                background: "white",
                paddingRight: "6px",
              }}
            >
              Tags
            </InputLabel>
            <Select
              labelId="multiple-checkbox"
              id="multiple-checkbox"
              multiple
              name="selectedTags"
              value={taskCard.selectedTags}
              onChange={handleSelectPartner}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {taskCard.possibleTags &&
                taskCard.possibleTags.map((name) => (
                  <MenuItem key={name[0]} value={name[1]}>
                    <Checkbox
                      checked={taskCard.selectedTags.indexOf(name[1]) > -1}
                    />
                    <ListItemText primary={name[1]} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </Box>

      <Box
        sx={{
          width: "225px",
        }}
      >
        {userTasks.status === "show" ? (
          <DatePicker
            disabled
            label="Due date"
            name="due_date"
            value={userTasks.task.due_date}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        ) : (
          <DatePicker
            label="Due date"
            name="due_date"
            value={userTasks.task.due_date}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      </Box>
      <Box sx={{ width: 225, marginTop: "10px" }}>
        {userTasks.status === "show" ? (
          <FormControl fullWidth disabled>
            <InputLabel id="selected-group">Choose group</InputLabel>
            <Select
              defaultValue=""
              id="selected-group"
              name="group"
              value={taskCard.selectedTaskGroup}
              label="Choose group"
              onChange={handleChange}
            >
              {userGroups.groupsArray.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <InputLabel id="selected-group">Choose group</InputLabel>
            <Select
              defaultValue=""
              id="selected-group"
              name="group"
              value={taskCard.selectedTaskGroup}
              label="Choose group"
              onChange={handleChange}
            >
              {userGroups.groupsArray.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      <Box sx={{ width: 225, marginTop: "10px" }}>
        {userTasks.status === "show" ? (
          <FormControl fullWidth disabled>
            <InputLabel
              id="multiple-checkbox"
              sx={{
                background: "white",
                paddingRight: "6px",
              }}
            >
              Assign to
            </InputLabel>
            <Select
              labelId="multiple-checkbox"
              id="multiple-checkbox"
              multiple
              name="selectedAssignees"
              value={taskCard.selectedAssignees}
              onChange={handleSelectPartner}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {taskCard.possibleAssignees &&
                taskCard.possibleAssignees.map((name) => (
                  <MenuItem key={name[0]} value={name[1]}>
                    <Checkbox
                      checked={taskCard.selectedAssignees.indexOf(name[1]) > -1}
                    />
                    <ListItemText primary={name[1]} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <InputLabel
              id="multiple-checkbox"
              sx={{
                background: "white",
                paddingRight: "6px",
              }}
            >
              Assign to
            </InputLabel>
            <Select
              labelId="multiple-checkbox"
              id="multiple-checkbox"
              multiple
              name="selectedAssignees"
              value={taskCard.selectedAssignees}
              onChange={handleSelectPartner}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {taskCard.possibleAssignees &&
                taskCard.possibleAssignees.map((name) => (
                  <MenuItem key={name[0]} value={name[1]}>
                    <Checkbox
                      checked={taskCard.selectedAssignees.indexOf(name[1]) > -1}
                    />
                    <ListItemText primary={name[1]} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </Box>
      {userTasks.status === "show" ? (
        <>
          <FormControlLabel
            disabled
            control={
              <Checkbox
                checked={userTasks.task.finished}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Finished"
          />
          {userTasks.task.reviewed && (
            <FormControlLabel
              disabled
              control={
                <Checkbox
                  checked={userTasks.task.reviewed}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Reviewed"
            />
          )}
        </>
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              name="finished"
              type="checkbox"
              checked={userTasks.task.finished}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Finished"
        />
      )}
      {userTasks.task.pending && (
        <Typography
          variant="caption"
          color="rgba(0, 0, 0, 0.38)"
          fontStyle="italic"
          sx={{
            textDecoration: "underline",
          }}
        >
          Pending Review
        </Typography>
      )}

      {userTasks.status === "show" ? (
        <TextField
          disabled
          id="note"
          label="Note"
          onChange={handleChange}
          name="note"
          value={userTasks.task.note ? userTasks.task.note : ""}
          multiline
          rows={5}
          sx={{
            marginTop: "10px",
            marginBottom: "30px",
            width: "225px",
          }}
        />
      ) : (
        <TextField
          id="note"
          label="Note"
          onChange={handleChange}
          name="note"
          value={userTasks.task.note ? userTasks.task.note : ""}
          multiline
          rows={5}
          sx={{
            marginTop: "10px",
            marginBottom: "30px",
            width: "225px",
          }}
        />
      )}
      {userTasks.status === "create" && (
        <Button
          variant="contained"
          onClick={handleTaskCreate}
          sx={{
            color: "#515151",
            fontWeight: "bold",
            backgroundColor: "#f9bb19",
            "&:hover": {
              backgroundColor: "#f7b613",
            },
            float: "right",
            marginRight: "26px",
          }}
        >
          Create task
        </Button>
      )}
      {userTasks.status === "edit" && (
        <Button
          variant="contained"
          onClick={handleTaskEdit}
          sx={{
            color: "#515151",
            fontWeight: "bold",
            backgroundColor: "#f9bb19",
            "&:hover": {
              backgroundColor: "#f7b613",
            },
            float: "right",
            marginRight: "26px",
          }}
        >
          Edit task
        </Button>
      )} */}
    </>
  );
}

export default ModalTask;
