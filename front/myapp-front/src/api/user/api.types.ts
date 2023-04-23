import { AxiosResponse } from "axios";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { UserContextAction } from "../../context/user/UserContext";
import { DetailedGroup } from "../../shared/group/interfaces";
import { GroupContextAction } from "../../context/group/GroupContext";
import { DetailedUser } from "../../shared/user/interfaces";

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

export type HandleMemberDeleteProps = {
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
  elementId: number;
};

export type HandleUserUpdateProps = {
  userState: DetailedUser;
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
};
