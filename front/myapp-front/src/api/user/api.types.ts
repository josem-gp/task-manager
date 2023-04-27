import { AxiosResponse } from "axios";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { UserContextAction } from "../../context/user/UserContext";
import { DetailedGroup } from "../../shared/group/interfaces";
import { GroupContextAction } from "../../context/group/GroupContext";
import { DetailedUser } from "../../shared/user/interfaces";
import { ApiCallCommonProps } from "../../shared/api/types";

export type FetchUserInfoProps = Pick<
  ApiCallCommonProps,
  "userDispatch" | "handleAxiosCall"
>;

export type HandleMemberDeleteProps = Omit<
  ApiCallCommonProps,
  "userDispatch"
> & {
  groupState: DetailedGroup;
  elementId: number;
};

export type HandleUserUpdateProps = Omit<
  ApiCallCommonProps,
  "groupDispatch"
> & {
  userState: DetailedUser;
};
