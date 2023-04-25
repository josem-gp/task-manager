import { AxiosResponse } from "axios";
import { GroupContextAction } from "../../context/group/GroupContext";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { DetailedGroup } from "../../shared/group/interfaces";

export type HandleInvitationCreateProps = {
  groupState: DetailedGroup;
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
  handleClose: () => void;
};

export type HandleInvitationDeleteProps = {
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
  elementId: number;
};
