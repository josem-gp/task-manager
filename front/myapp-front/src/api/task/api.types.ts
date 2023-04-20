import { AxiosResponse } from "axios";
import { UserContextAction } from "../../context/user/UserContext";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { FilterTasksRequest, TaskObject } from "../../shared/task/interfaces";
import { GroupContextAction } from "../../context/group/GroupContext";
import { DetailedGroup } from "../../shared/group/interfaces";

type HandleTaskCommonProps = {
  userDispatch: React.Dispatch<UserContextAction>;
  setPopup: React.Dispatch<
    React.SetStateAction<{
      message: string | null;
      type: "success" | "error";
    }>
  >;
  handleAxiosCall: <T, U>({
    method,
    url,
    data,
    needAuth,
  }: handleAxiosCallProps<T>) => Promise<
    void | AxiosResponse<U, any> | undefined
  >;
};

export type HandleTaskSubmitProps = HandleTaskCommonProps & {
  handleClose: () => void;
};

export type HandleTaskDeleteProps = HandleTaskCommonProps & {
  elementId: number;
};

export type HandleTaskUpdateProps = HandleTaskCommonProps & {
  element: TaskObject;
  handleClose: () => void;
};

export type HandleTaskFilterProps = Pick<
  HandleTaskCommonProps,
  "handleAxiosCall" | "setPopup"
> & {
  groupState: DetailedGroup;
  state: FilterTasksRequest;
  groupDispatch: React.Dispatch<GroupContextAction>;
  handleClose: () => void;
};
