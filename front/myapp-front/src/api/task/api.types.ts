import { FilterTasksRequest, TaskObject } from "../../shared/task/interfaces";
import { DetailedGroup } from "../../shared/group/interfaces";
import { ApiCallCommonProps } from "../../shared/api/types";

export type HandleTaskSubmitProps = Omit<
  ApiCallCommonProps,
  "groupDispatch"
> & {
  handleClose: () => void;
};

export type HandleTaskDeleteProps = Omit<
  ApiCallCommonProps,
  "groupDispatch"
> & {
  elementId: number;
};

export type HandleTaskUpdateProps = Omit<
  ApiCallCommonProps,
  "groupDispatch"
> & {
  element: TaskObject;
  handleClose: () => void;
};

export type HandleTaskFilterProps = Omit<ApiCallCommonProps, "userDispatch"> & {
  groupState: DetailedGroup;
  state: FilterTasksRequest;
  handleClose: () => void;
};
