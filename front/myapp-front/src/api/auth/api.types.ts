import { AxiosResponse } from "axios";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { UserAuthRequest } from "../../shared/auth/interfaces";
import { UserContextAction } from "../../context/user/UserContext";

export type handleUserAuthProps = {
  handleAxiosCall: <T, U>({
    method,
    url,
    data,
    needAuth,
  }: handleAxiosCallProps<T>) => Promise<
    void | AxiosResponse<U, any> | undefined
  >;
  data: UserAuthRequest;
  url: string;
  setAuthToken: (response: string) => void;
  userDispatch: React.Dispatch<UserContextAction>;
  setPopup: React.Dispatch<
    React.SetStateAction<{
      message: string | null;
      type: "success" | "error";
    }>
  >;
};
