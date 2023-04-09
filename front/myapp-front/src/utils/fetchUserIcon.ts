import { DividedUserDetails } from "../types/interfaces";
import { DEFAULT_ICON_URL } from "./constants";

export function fetchIconUrl(users: DividedUserDetails[], user_id: number) {
  const taskOwner = users.find((u) => u.user.id === user_id);
  return taskOwner ? taskOwner.user_icon.url : DEFAULT_ICON_URL;
}
