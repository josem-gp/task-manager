import { Alert, Box } from "@mui/material";
import { useContext } from "react";
import { PopupContext } from "../../context/popup/PopupContext";
import { ActionAlertsProps } from "./ActionAlertsProps.types";

function ActionAlerts({ severity }: ActionAlertsProps) {
  const { popup, setPopup } = useContext(PopupContext);

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
        severity={popup.type}
        onClose={() => {
          setPopup((prevState) => ({ ...prevState, message: null }));
        }}
      >
        {popup.message}
      </Alert>
    </Box>
  );
}

export default ActionAlerts;
