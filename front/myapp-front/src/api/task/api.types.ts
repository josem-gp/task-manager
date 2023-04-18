import { AxiosResponse } from "axios";
import { UserContextAction } from "../../context/user/UserContext";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";

export type HandleTaskSubmitProps = {
  userDispatch: React.Dispatch<UserContextAction>;
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
  handleClose: () => void;
};
