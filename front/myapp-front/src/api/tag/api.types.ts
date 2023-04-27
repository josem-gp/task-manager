import { ApiCallCommonProps } from "../../shared/api/types";
import { DetailedGroup } from "../../shared/group/interfaces";
import { Tag } from "../../shared/tag/interfaces";

export type HandleTagCreateProps = Omit<ApiCallCommonProps, "userDispatch"> & {
  groupState: DetailedGroup;
  handleClose: () => void;
};

export type HandleTagUpdateProps = Omit<ApiCallCommonProps, "userDispatch"> & {
  groupState: DetailedGroup;
  element: Tag;
  handleClose: () => void;
};

export type HandleTagDeleteProps = Omit<ApiCallCommonProps, "userDispatch"> & {
  groupState: DetailedGroup;
  elementId: number;
};
