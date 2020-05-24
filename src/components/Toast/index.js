import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { emptyMessage } from "../../actions/settings";

const ToastHandler = () => {
  const { enqueueSnackbar } = useSnackbar();
  const message = useSelector((state) => state.settings.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch(emptyMessage());
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
