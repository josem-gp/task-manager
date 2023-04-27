import { AxiosResponse } from "axios";
import { GroupContextAction } from "../../context/group/GroupContext";
import { UserContextAction } from "../../context/user/UserContext";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";

export type ApiCallCommonProps = {
  userDispatch: React.Dispatch<UserContextAction>;
  groupDispatch: React.Dispatch<GroupContextAction>;
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
