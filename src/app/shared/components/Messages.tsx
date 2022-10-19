import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { clearMessage } from "../../store/reducers/slices/messageSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const messagesRedux = useAppSelector((state) => state.messageSlice);
  const dispatch = useAppDispatch();

  React.useEffect(() => {}, [messagesRedux]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(clearMessage());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={messagesRedux.open}
        onClose={handleClose}
        anchorOrigin={messagesRedux.origin}
        autoHideDuration={messagesRedux.autoHideDuration}
      >
        <Alert
          onClose={handleClose}
          severity={`${messagesRedux.severity}`}
          sx={{ width: "100%" }}
        >
          {messagesRedux.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
