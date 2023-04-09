import {
  DividedTaskDetails,
  DividedUserDetails,
  InvitationDetails,
  TagDetails,
} from "../../types/interfaces";

export type TaskRendererProps = {
  element: DividedTaskDetails;
};

export type UserRendererProps = {
  element: DividedUserDetails;
};

export type TagRendererProps = {
  element: TagDetails;
};

export type InvitationRendererProps = {
  element: InvitationDetails;
};
