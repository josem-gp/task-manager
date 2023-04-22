import { DetailedGroup } from "../../shared/group/interfaces";
import { FetchGroupInfoProps } from "./api.types";

// Fetch Group info from the API
export async function fetchGroupInfo(props: FetchGroupInfoProps) {
  const { handleAxiosCall, dispatch, selectedGroupId } = props;
  const response = await handleAxiosCall<undefined, DetailedGroup>({
    method: "get",
    url: `http://localhost:3000/api/v1/groups/${selectedGroupId}`,
    needAuth: true,
  });

  if (response) {
    // To set the group in the context
    dispatch({
      type: "SET_GROUP",
      payload: response.data.group,
    });
    // To set the group users in the context
    dispatch({
      type: "SET_GROUP_MEMBERS",
      payload: response.data.groupUsers,
    });
    // To set the group tags in the context
    dispatch({
      type: "SET_GROUP_TAGS",
      payload: response.data.groupTags,
    });
    // To set the group invitations in the context
    dispatch({
      type: "SET_GROUP_INVITATIONS",
      payload: response.data.groupInvitations,
    });
  }
}
