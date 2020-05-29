import React from "react";
import Modal from "../Constructors/Modal";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import Styles from "./InfoTaskModal.style";
import { updateTask, deleteTask } from "../../actions/app";
import { useSelector, useDispatch } from "react-redux";

const InfoTaskModal = ({ open, toggleModal, task, columnId }) => {
  const classes = Styles();
  const [editMode, setEditMode] = React.useState(false);
  const [content, setContent] = React.useState(task.content);
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const submitChanges = () => {
    dispatch(updateTask(app, columnId, content, task.id));
  };

  const trashTask = () => {
    dispatch(deleteTask(app, columnId, task.id));
  };

  return (
    <Modal
      open={open}
      toggleModal={toggleModal}
      toggleOnMyCall={true}
      handleSubmit={editMode ? submitChanges : false}
      title={
        <div className={classes.modalHeader}>
          <h4>Task #{task.id} Info</h4>
          <div>
            <IconButton
              onClick={() => {
                setEditMode((open) => !open);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                toggleModal();
                trashTask();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      }
    >
      <div>
        <textarea
          disabled={!editMode}
          onChange={(e) => setContent(e.target.value)}
          className={classes.textarea}
          onKeyUp={(e) => {
            e.target.style.height = "1px";
            e.target.style.height = 25 + e.target.scrollHeight + "px";
          }}
          value={content}
        />
      </div>
    </Modal>
  );
};

export default InfoTaskModal;
