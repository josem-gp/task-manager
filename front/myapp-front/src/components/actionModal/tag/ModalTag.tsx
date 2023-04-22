import { Box, TextField } from "@mui/material";
import { useState } from "react";
import ActionBtn from "../../actionBtn/ActionBtn";
import ActionModalHeader from "../header/ActionModalHeader";
import { ModalTagProps } from "./ModalTag.types";
import { TagRequest } from "../../../shared/tag/interfaces";

function ModalTag({
  action,
  initialData,
  handleSubmit,
  elementId,
}: ModalTagProps) {
  const [formAction, setFormAction] = useState(action);
  const isShow = formAction === "show";
  const isEdit = formAction === "edit";
  const [data, setData] = useState<TagRequest>(initialData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      tag: {
        ...prevState.tag,
        [name]: value,
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
        elementId={elementId}
        type="tag"
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
          value={data.tag.name.toLowerCase().split(" ").join("_")}
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
