import { UserAuthRequest } from "../../shared/auth/interfaces";
import { ApiCallCommonProps } from "../../shared/api/types";

export type handleUserAuthProps = Omit<ApiCallCommonProps, "groupDispatch"> & {
  data: UserAuthRequest;
  url: string;
  setAuthToken: (response: string) => void;
};
