import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { TaskModalProps } from "./ActionModal.types";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Group, TagDetails, TaskFormDetails } from "../../types/interfaces";
import MyDatePicker from "../myDatePicker/MyDatePicker";
import dayjs from "dayjs";
import { ElementSelect } from "../elementSelect/ElementSelect";
import { UserContext } from "../../context/user/UserContext";
import { initialState as GroupInitialState } from "../../context/group/GroupContext";
import ActionBtn from "../actionBtn/ActionBtn";
import { UseApiProps } from "../../types/types";
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { fetchData } from "../../utils/fetchApiData";
import { ErrorContext } from "../../context/error/ErrorContext";
import ActionModalHeader from "./ActionModalHeader";

function ModalTask({ action, initialData, handleSubmit }: TaskModalProps) {
  const [formAction, setFormAction] = useState(action);
  const isShow = formAction === "show";
  const isEdit = formAction === "edit";
  const { state: userState } = useContext(UserContext);
  // We create this state to hold the groupState info because we want it to be empty in the beginning
  // And groupState is not empty since it is holding the value of the group we selected in the sidebar
  const [taskGroup, setTaskGroup] = useState<Group>(GroupInitialState);
  const { setError } = useContext(ErrorContext);
  const [data, setData] = useState<TaskFormDetails>(initialData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
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
        tag_ids: value.map((tag) => tag.id),
      },
    }));
  }

  function fetchTaskTags(): TagDetails[] {
    if (taskGroup.groupTags) {
      return taskGroup.groupTags.filter((obj) =>
        data.task.tag_ids.includes(obj.id)
      );
    }
    return [];
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
      <ActionModalHeader
        title={
          isShow
            ? "Check your task"
            : isEdit
            ? "Edit your task"
            : "Create a task"
        }
        isShow={isShow}
        setFormAction={setFormAction}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          marginTop: "20px",
        }}
      >
        <TextField
          disabled={isShow ? true : undefined}
          label="Name"
          onChange={handleChange}
          name="name"
          value={data.task.name}
        />

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

        <ElementSelect
          disabled={isShow || isEdit ? true : false}
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

        <Autocomplete
          disabled={isShow ? true : undefined}
          multiple
          options={taskGroup.groupTags}
          getOptionLabel={(tag) => tag.slug}
          value={fetchTaskTags()}
          onChange={handleAutocompleteChange}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Tags" placeholder="Select tags" />
          )}
        />

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

        <TextField
          disabled={isShow ? true : undefined}
          label="Note"
          onChange={handleChange}
          name="note"
          value={data.task.note}
        />

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

        {!isShow && (
          <ActionBtn
            name={isEdit ? "Edit task" : "Create task"}
            onClick={() => handleSubmit(data)}
          />
        )}
      </Box>
    </>
  );
}

export default ModalTask;
