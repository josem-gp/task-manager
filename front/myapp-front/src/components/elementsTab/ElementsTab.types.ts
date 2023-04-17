import { TagDetails } from "../../shared/general/interfaces";
import { InvitationDetails } from "../../shared/general/interfaces";
import { DividedUserDetails } from "../../shared/general/interfaces";
import { DividedTaskDetails } from "../../shared/general/interfaces";

type TaskTabHeader = {
  type: "task";
  label: string;
  value: string;
  data: DividedTaskDetails[];
};

type UserTabHeader = {
  type: "user";
  label: string;
  value: string;
  data: DividedUserDetails[];
};

type TagTabHeader = {
  type: "tag";
  label: string;
  value: string;
  data: TagDetails[];
};

type InvitationTabHeader = {
  type: "invitation";
  label: string;
  value: string;
  data: InvitationDetails[];
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
