import * as React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNotificationContext } from "../hooks/NotificationContext";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notificationsnackbar = () => {
  const { snackbarOpen, setSnackbarOpen, snackbarMessage } =
    useNotificationContext();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success" onClose={handleClose}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default Notificationsnackbar;
