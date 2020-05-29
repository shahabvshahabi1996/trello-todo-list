import React from "react";
import Modal from "../Constructors/Modal";
import { TextField } from "@material-ui/core";
import Styles from "./AddColumnModal.style.js";

const AddColumnModal = ({ open, handleSumbmit, toggleModal }) => {
  const [title, setTitle] = React.useState("");
  const [describtion, setDescription] = React.useState("");
  const classes = Styles();

  return (
    <Modal
      open={open}
      handleSubmit={() => handleSumbmit(title, describtion)}
      toggleModal={() => {
        setTitle("");
        setDescription("");
        toggleModal();
      }}
      title="Add list"
      disabled={title.length === 0}
    >
      <div className={classes.inputContainer}>
        <TextField
          autoFocus
          label="List Title"
          variant="outlined"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={classes.inputContainer}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </Modal>
  );
};
export default AddColumnModal;
