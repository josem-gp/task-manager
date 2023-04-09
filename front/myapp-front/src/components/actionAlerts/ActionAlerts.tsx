import { Alert, Stack } from "@mui/material";
import { useContext } from "react";
import { ErrorContext } from "../../context/error/ErrorContext";
import { ActionAlertsProps } from "./ActionAlertsProps.types";

function ActionAlerts({ severity }: ActionAlertsProps) {
  const { error, setError } = useContext(ErrorContext);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        severity={severity}
        onClose={() => {
          setError(null);
        }}
      >
        {error}
      </Alert>
    </Stack>
  );
}

export default ActionAlerts;
