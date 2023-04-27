import { UserAuthRequest } from "../../shared/auth/interfaces";
import { ApiCallCommonProps } from "../../shared/api/types";

export type HandleUserAuthProps = Omit<ApiCallCommonProps, "groupDispatch"> & {
  data: UserAuthRequest;
  url: string;
  setAuthToken: (response: string) => void;
};

export type HandleUserLogOutProps = ApiCallCommonProps;
