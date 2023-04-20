import { AxiosResponse } from "axios";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { GroupContextAction } from "../../context/group/GroupContext";
import { DetailedGroup } from "../../shared/group/interfaces";
import { Tag } from "../../shared/tag/interfaces";

type CommonHandleTagProps = {
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
};

export type HandleTagCreateProps = CommonHandleTagProps & {
  handleClose: () => void;
};

export type HandleTagUpdateProps = CommonHandleTagProps & {
  element: Tag;
  handleClose: () => void;
};
