import { Box, TextField } from "@mui/material";
import { TagModalProps } from "./ActionModal.types";
import { useContext, useState } from "react";
import { TagFormDetails } from "../../types/interfaces";
import {
  GroupContext,
  initialState as GroupInitialState,
} from "../../context/group/GroupContext";
import ActionBtn from "../actionBtn/ActionBtn";
import ActionModalHeader from "./ActionModalHeader";
import { ElementSelect } from "../elementSelect/ElementSelect";
import { UserContext } from "../../context/user/UserContext";

function ModalTag({
  action,
  initialData,
  handleSubmit,
  setGroup,
}: TagModalProps) {
  const [formAction, setFormAction] = useState(action);
  const isShow = formAction === "show";
  const isEdit = formAction === "edit";
  const { state: userState } = useContext(UserContext);
  // We create this state to hold the groupState info because we want it to be empty in the beginning
  // And groupState is not empty since it is holding the value of the group we selected in the sidebar
  const { state: groupState, dispatch: groupDispatch } =
    useContext(GroupContext);
  const [data, setData] = useState<TagFormDetails>(initialData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      tag: {
        ...prevState.tag,
        [name]: value,
        slug: value.toLowerCase().split(" ").join("_"),
      },
    }));
  }

  return (
    <>
      <ActionModalHeader
        title={
          isShow ? "Check your tag" : isEdit ? "Edit your tag" : "Create a tag"
        }
        isShow={isShow}
        setFormAction={setFormAction}
        elementId={data.tag.id ?? ""}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          marginTop: "20px",
        }}
      >
        <TextField
          disabled={isShow ? true : undefined}
          label="Name"
          onChange={handleChange}
          name="name"
          value={data.tag.name}
        />

        <TextField
          disabled={true}
          label="Slug"
          name="slug"
          value={data.tag.slug}
        />

        {!isShow && (
          <ActionBtn
            name={isEdit ? "Edit tag" : "Create tag"}
            onClick={() => handleSubmit(data)}
          />
        )}
      </Box>
    </>
  );
}

export default ModalTag;
