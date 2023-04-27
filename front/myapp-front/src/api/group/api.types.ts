import { GroupContextAction } from "../../context/group/GroupContext";
import { ApiCallCommonProps } from "../../shared/api/types";

export type FetchGroupInfoProps = Pick<
  ApiCallCommonProps,
  "handleAxiosCall"
> & {
  dispatch: React.Dispatch<GroupContextAction>;
  selectedGroupId: string;
};
