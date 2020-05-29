import React from "react";
import Modal from "../Constructors/Modal";
import { TextField } from "@material-ui/core";
import Styles from "./AddTaskModal.style.js";
import { updateTask } from "../../actions/app";
import { useDispatch, useSelector } from "react-redux";

const AddTaskModal = ({ open, toggleModal, columnId }) => {
  const [content, setContent] = React.useState("");
  const app = useSelector((state) => state.app);
  const classes = Styles();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(updateTask(app, columnId, content, undefined));
  };

  return (
    <Modal
      open={open}
      handleSubmit={handleSubmit}
      toggleModal={() => {
        setContent("");
        toggleModal();
      }}
      title="Add Task"
      disabled={content.length === 0}
    >
      <div className={classes.inputContainer}>
        <TextField
          autoFocus
          label="Task Content"
          variant="outlined"
          fullWidth
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </Modal>
  );
};
export default AddTaskModal;
