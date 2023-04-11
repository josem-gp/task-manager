import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
import { CardModalProps } from "./ActionModal.types";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Group, TagDetails, TaskFormDetails } from "../../types/interfaces";
import { GroupContext } from "../../context/group/GroupContext";
import MyDatePicker from "../myDatePicker/MyDatePicker";
import dayjs from "dayjs";
import { ElementSelect } from "../elementSelect/ElementSelect";
import { UserContext } from "../../context/user/UserContext";
import { SidebarBtnContext } from "../../context/sidebarBtn/SidebarBtnContext";
import { initialState as GroupInitialState } from "../../context/group/GroupContext";
import ActionBtn from "../actionBtn/ActionBtn";
import { UseApiProps } from "../../types/types";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { fetchData } from "../../utils/fetchApiData";
import { ErrorContext } from "../../context/error/ErrorContext";

function ModalTask({ action }: CardModalProps) {
  const [formAction, setFormAction] = useState(action);
  const isShow = formAction === "show";
  const isEdit = formAction === "edit";
  const { state: userState } = useContext(UserContext);
  // We create this state to hold the groupState info because we want it to be empty in the beginning
  // And groupState is not empty since it is holding the value of the group we selected in the sidebar
  const [taskGroup, setTaskGroup] = useState<Group>(GroupInitialState);
  const { setError } = useContext(ErrorContext);
  const [data, setData] = useState<TaskFormDetails>({
    task: {
      name: "",
      note: "",
      finished: false,
      due_date: "",
      assignee_id: "",
      group_id: "",
      tag_ids: [],
    },
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    console.log(name);
    console.log(type);
    setData((prevState) => ({
      ...prevState,
      task: {
        ...prevState.task,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  }

  function handleAutocompleteChange(
    event: SyntheticEvent<Element, Event>,
    value: TagDetails[]
  ) {
    setData((prevState) => ({
      ...prevState,
      task: {
        ...prevState.task,
        tag_ids: [...prevState.task.tag_ids, value[value.length - 1].id],
      },
    }));
  }

  function fetchGroupInfo() {
    const params: UseApiProps<undefined> = {
      method: "get",
      url: `http://localhost:3000/api/v1/groups/${data.task.group_id}`,
      headers: {
        Authorization: `Bearer ${userState.userAuth}`,
        "Content-Type": "application/json",
      } as AxiosRequestHeaders,
    };

    fetchData<undefined, Group>(params)
      .then((response: AxiosResponse<Group> | AxiosError) => {
        if ("data" in response) {
          setTaskGroup(response.data);
        } else {
          setError(
            response.response?.statusText as React.SetStateAction<string | null>
          );
        }
      })
      .catch((error: AxiosError) => {
        setError(
          error.response?.statusText as React.SetStateAction<string | null>
        );
      });
  }

  useEffect(() => {
    if (data.task.group_id) {
      fetchGroupInfo();
    }
  }, [data.task.group_id]);

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
        label="Name"
        onChange={handleChange}
        name="name"
        value={data.task.name}
        sx={{
          marginBottom: "10px",
          marginTop: "30px",
          width: "225px",
        }}
      />

      <Box
        sx={{
          width: "225px",
        }}
      >
        <MyDatePicker
          disabled={isShow ? true : false}
          label="Due date"
          value={data.task.due_date}
          setElement={(newValue: dayjs.Dayjs | null) =>
            setData((prevState) => ({
              ...prevState,
              task: {
                ...prevState.task,
                due_date: newValue ? newValue.format("YYYY/MM/DD") : "",
              },
            }))
          }
        />
      </Box>

      <Box sx={{ width: 225, marginTop: "10px" }}>
        <ElementSelect
          disabled={isShow ? true : false}
          name="Choose a group"
          elements={userState.userGroups}
          elementId={data.task.group_id}
          setElementId={(id: string) =>
            setData((prevState) => ({
              ...prevState,
              task: {
                ...prevState.task,
                group_id: id,
              },
            }))
          }
        />
      </Box>

      <Box sx={{ width: 225, marginBottom: "10px" }}>
        <Autocomplete
          disabled={isShow ? true : undefined}
          multiple
          options={taskGroup.groupTags}
          getOptionLabel={(tag) => tag.slug}
          defaultValue={[]}
          onChange={handleAutocompleteChange}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Tags" placeholder="Select tags" />
          )}
        />
      </Box>

      <Box sx={{ width: 225, marginTop: "10px" }}>
        <ElementSelect
          disabled={isShow ? true : false}
          name="Choose assignee"
          elements={taskGroup.groupUsers}
          elementId={data.task.assignee_id}
          setElementId={(id: string) =>
            setData((prevState) => ({
              ...prevState,
              task: {
                ...prevState.task,
                assignee_id: id,
              },
            }))
          }
        />
      </Box>

      <FormControlLabel
        disabled={isShow ? true : undefined}
        control={
          <Checkbox
            name="finished"
            checked={data.task.finished}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Finished"
      />

      <TextField
        disabled={isShow ? true : undefined}
        label="Note"
        onChange={handleChange}
        name="note"
        value={data.task.note}
        sx={{
          marginBottom: "10px",
          marginTop: "30px",
          width: "225px",
        }}
      />

      {!isShow && (
        <ActionBtn
          name={isEdit ? "Edit task" : "Create task"}
          onClick={() => console.log("Clicked")}
        />
      )}
    </>
  );
}

export default ModalTask;
