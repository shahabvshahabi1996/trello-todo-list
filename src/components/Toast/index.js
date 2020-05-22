import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useSelector } from "react-redux";

const ToastHandler = () => {
  const { enqueueSnackbar } = useSnackbar();
  const message = useSelector((state) => state.settings.message);

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
    }
  }, [message]);

  return <></>;
};

const Toast = ({ children }) => {
  return (
    <SnackbarProvider maxSnack={10}>
      <ToastHandler />
      {children}
    </SnackbarProvider>
  );
};

export default Toast;
