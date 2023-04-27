import { AxiosResponse } from "axios";
import { GroupContextAction } from "../../context/group/GroupContext";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { DetailedGroup } from "../../shared/group/interfaces";
import { ApiCallCommonProps } from "../../shared/api/types";

export type HandleInvitationCreateProps = Omit<
  ApiCallCommonProps,
  "userDispatch"
> & {
  groupState: DetailedGroup;
  handleClose: () => void;
};

export type HandleInvitationDeleteProps = Omit<
  ApiCallCommonProps,
  "userDispatch"
> & {
  elementId: number;
};
