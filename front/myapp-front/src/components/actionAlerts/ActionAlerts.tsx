import { Alert, Box, Stack } from "@mui/material";
import { useContext } from "react";
import { ErrorContext } from "../../context/error/ErrorContext";
import { ActionAlertsProps } from "./ActionAlertsProps.types";

function ActionAlerts({ severity }: ActionAlertsProps) {
  const { error, setError } = useContext(ErrorContext);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        // theme.zIndex.snackbar is a value provided by the Material-UI theme system that represents the z-index for snackbars
        zIndex: (theme) => theme.zIndex.snackbar,
      }}
    >
      <Alert
        severity={severity}
        onClose={() => {
          setError(null);
        }}
      >
        {error}
      </Alert>
    </Box>
  );
}

export default ActionAlerts;
