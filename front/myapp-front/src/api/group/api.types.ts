import { GroupContextAction } from "../../context/group/GroupContext";
import { ApiCallCommonProps } from "../../shared/api/types";
import { Group } from "../../shared/group/interfaces";

export type FetchGroupInfoProps = Pick<
  ApiCallCommonProps,
  "handleAxiosCall"
> & {
  dispatch: React.Dispatch<GroupContextAction>;
  selectedGroupId: string;
};

export type HandleGroupCreateProps = Omit<
  ApiCallCommonProps,
  "groupDispatch"
> & {
  handleClose: () => void;
};

export type HandleGroupDeleteProps = Omit<
  ApiCallCommonProps,
  "groupDispatch"
> & {
  elementId: number;
};

export type HandleGroupUpdateProps = Omit<
  ApiCallCommonProps,
  "groupDispatch"
> & {
  element: Group;
  handleClose: () => void;
};
