import {
  TaskObject,
  TaskRequest,
  TaskResponse,
} from "../../shared/task/interfaces";
import { HandleTaskSubmitProps } from "./api.types";

export async function handleTaskSubmit(
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
