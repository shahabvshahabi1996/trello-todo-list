import React, { useEffect } from "react";
import Styles from "./UpdateColumnModal.style";
import Modal from "../Constructors/Modal";
import { TextField } from "@material-ui/core";

const UpdateColumnModal = ({ open, toggleModal, handleSubmit, ...rest }) => {
  const classes = Styles();
  const [title, setTitle] = React.useState(rest.title);
  const [description, setDescribtion] = React.useState(rest.description);

  useEffect(() => {
    setTitle(rest.title);
    setDescribtion(rest.description);
  }, [rest.title, rest.description]);

  return (
    <Modal
      open={open}
      handleSubmit={() => handleSubmit(title, description)}
      toggleModal={() => {
        setTitle("");
        setDescribtion("");
        toggleModal();
      }}
      title="Update List"
      disabled={title && title.length === 0}
    >
      <div className={classes.inputContainer}>
        <TextField
          label="List Title"
          variant="outlined"
          autoFocus
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={classes.inputContainer}>
        <TextField
          label="Describtion"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescribtion(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default UpdateColumnModal;
