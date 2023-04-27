import React, { useState } from "react";
import { ModalGroupProps } from "./ModalGroup.types";
import { Box, TextField } from "@mui/material";
import ActionBtn from "../../actionBtn/ActionBtn";
import ActionModalHeader from "../header/ActionModalHeader";
import { GroupRequest } from "../../../shared/group/interfaces";

function ModalGroup({
  action,
  initialData,
  handleSubmit,
  elementId,
}: ModalGroupProps) {
  const [formAction, setFormAction] = useState(action);
  const isShow = formAction === "show";
  const isEdit = formAction === "edit";
  const [data, setData] = useState<GroupRequest>(initialData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      group: {
        ...prevState.group,
        [name]: value,
      },
    }));
  }

  return (
    <>
      <ActionModalHeader
        title={
          isShow
            ? "Check your group"
            : isEdit
            ? "Edit your group"
            : "Create a group"
        }
        isShow={isShow}
        setFormAction={setFormAction}
        type="group"
        elementId={elementId}
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
          disabled={isShow ? true : false}
          label="Name"
          onChange={handleChange}
          name="name"
          value={data.group.name}
        />

        <TextField
          disabled={isShow ? true : false}
          label="Description"
          name="description"
          onChange={handleChange}
          value={data.group.description}
        />

        {!isShow && (
          <ActionBtn
            name={isEdit ? "Edit group" : "Create group"}
            onClick={() => handleSubmit(data)}
          />
        )}
      </Box>
    </>
  );
}

export default ModalGroup;
