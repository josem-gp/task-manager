import { TagDetails } from "../../types/interfaces";
import { InvitationDetails } from "../../types/interfaces";
import { DividedUserDetails } from "../../types/interfaces";
import { DividedTaskDetails } from "../../types/interfaces";

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
};
