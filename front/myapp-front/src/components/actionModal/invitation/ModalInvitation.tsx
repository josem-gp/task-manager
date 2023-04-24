import { Box, TextField } from "@mui/material";
import ActionBtn from "../../actionBtn/ActionBtn";
import { useState } from "react";
import { InvitationModalProps } from "./ModalInvitation.types";

function ModalInvitation({ initialData, handleSubmit }: InvitationModalProps) {
  const [data, setData] = useState(initialData);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setData({
      invitation: {
        email: value,
      },
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
        marginTop: "20px",
      }}
    >
      <TextField
        label="Email"
        onChange={handleChange}
        name="email"
        value={data.invitation.email}
      />

      <ActionBtn name="Create invitation" onClick={() => handleSubmit(data)} />
    </Box>
  );
}

export default ModalInvitation;
