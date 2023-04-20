import { AxiosResponse } from "axios";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { UserContextAction } from "../../context/user/UserContext";

export type FetchUserInfoProps = {
  handleAxiosCall: <T, U>({
    method,
    url,
    data,
    needAuth,
  }: handleAxiosCallProps<T>) => Promise<
    void | AxiosResponse<U, any> | undefined
  >;
  userDispatch: React.Dispatch<UserContextAction>;
};
