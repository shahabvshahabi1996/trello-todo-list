import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
} from "@material-ui/core";

const Styles = makeStyles((theme) => ({
  wrapper: {
    ...theme.typography.body1,
  },
}));

const Modal = ({
  children,
  open,
  toggleModal,
  title,
  handleSubmit = false,
  disabled,
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
          toggleModal();
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
