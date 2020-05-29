import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import Styles from "./Modal.style";

const Modal = ({
  children,
  open,
  toggleModal,
  title,
  handleSubmit = false,
  disabled,
  toggleOnMyCall = false,
}) => {
  const classes = Styles();
  return (
    <Dialog open={open} onClose={toggleModal} fullWidth={true} maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (handleSubmit) {
            handleSubmit();
          }
          if (!toggleOnMyCall) {
            toggleModal();
          }
        }}
      >
        <DialogContent>
          <div className={classes.wrapper}>{children}</div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => toggleModal()}>
            Cancel
          </Button>
          {handleSubmit && (
            <Button disabled={disabled} color="primary" type={"submit"}>
              Submit
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Modal;
