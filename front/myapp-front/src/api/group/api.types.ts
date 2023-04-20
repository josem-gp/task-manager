import { AxiosResponse } from "axios";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { GroupContextAction } from "../../context/group/GroupContext";

export type FetchGroupInfoProps = {
  handleAxiosCall: <T, U>({
    method,
    url,
    data,
    needAuth,
  }: handleAxiosCallProps<T>) => Promise<
    void | AxiosResponse<U, any> | undefined
  >;
  dispatch: React.Dispatch<GroupContextAction>;
  selectedGroupId: string;
};
