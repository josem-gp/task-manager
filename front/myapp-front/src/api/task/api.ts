import { GenericMessageResponse } from "../../shared/general/interfaces";
import {
  FilterTasksRequest,
  TaskObject,
  TaskRequest,
  TaskResponse,
} from "../../shared/task/interfaces";
import {
  HandleTaskDeleteProps,
  HandleTaskFilterProps,
  HandleTaskSubmitProps,
  HandleTaskUpdateProps,
} from "./api.types";

// Create a task
export async function handleTaskCreate(
  props: HandleTaskSubmitProps,
  data: TaskRequest
) {
  const { userDispatch, setPopup, handleAxiosCall, handleClose } = props;

  const response = await handleAxiosCall<TaskRequest, TaskResponse<TaskObject>>(
    {
      method: "post",
      url: "http://localhost:3000/api/v1/tasks",
      data: data,
      needAuth: true,
    }
  );

  if (response) {
    // Add task to userTasks after task creation
    userDispatch({
      type: "ADD_USER_TASK",
      payload: response.data.task_value,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }

  // Closing the modal
  handleClose();
}

// Remove a task
export async function handleTaskDelete(props: HandleTaskDeleteProps) {
  const { userDispatch, setPopup, handleAxiosCall, elementId } = props;

  const response = await handleAxiosCall<undefined, GenericMessageResponse>({
    method: "delete",
    url: `http://localhost:3000/api/v1/tasks/${elementId}`,
    needAuth: true,
  });

  if (response) {
    // Remove task from UserTasks
    userDispatch({
      type: "REMOVE_USER_TASK",
      payload: elementId,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }
}

// Update a specific task in the userTasks state
export async function handleTaskUpdate(
  props: HandleTaskUpdateProps,
  data: TaskRequest
) {
  const { userDispatch, setPopup, handleAxiosCall, element, handleClose } =
    props;

  const response = await handleAxiosCall<TaskRequest, TaskResponse<TaskObject>>(
    {
      method: "patch",
      url: `http://localhost:3000/api/v1/tasks/${element.task.id}`,
      data: data,
      needAuth: true,
    }
  );

  if (response) {
    // This will update the userTasks and so it will update the group tasks
    // thanks to the useEffect in the groupContext
    userDispatch({
      type: "UPDATE_USER_TASK",
      payload: response.data.task_value,
    });

    // Add notification
    setPopup({ message: response.data.message, type: "success" });

    // Closing the modal
    handleClose();
  }
}

// Filter tasks
export async function handleTaskFilter(props: HandleTaskFilterProps) {
  const {
    handleAxiosCall,
    groupState,
    state,
    groupDispatch,
    setPopup,
    handleClose,
  } = props;
  const response = await handleAxiosCall<
    FilterTasksRequest,
    TaskResponse<TaskObject[]>
  >({
    method: "post",
    url: `http://localhost:3000/api/v1/groups/${groupState.group?.id}/filter_tasks`,
    data: state,
    needAuth: true,
  });

  if (response) {
    // To set the group tasks in the context
    groupDispatch({
      type: "SET_GROUP_TASKS",
      payload: response.data.task_value,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }

  // After filtering or resetting we close modal
  handleClose();
}
