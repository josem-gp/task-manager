import { Invitation } from "../../shared/invitation/interfaces";
import { Tag } from "../../shared/tag/interfaces";
import { TaskObject } from "../../shared/task/interfaces";
import { UserObject } from "../../shared/user/interfaces";

type TaskTabHeader = {
  type: "task";
  label: string;
  value: string;
  data: TaskObject[];
};

type UserTabHeader = {
  type: "user";
  label: string;
  value: string;
  data: UserObject[];
};

type TagTabHeader = {
  type: "tag";
  label: string;
  value: string;
  data: Tag[];
};

type InvitationTabHeader = {
  type: "invitation";
  label: string;
  value: string;
  data: Invitation[];
};

type TabHeader =
  | TaskTabHeader
  | UserTabHeader
  | TagTabHeader
  | InvitationTabHeader;

export type CompoundTabProps = {
  tabHeaders: TabHeader[];
  setOnTagFocus?: React.Dispatch<React.SetStateAction<boolean>>;
};
