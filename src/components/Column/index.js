import React from "react";
import { Paper, MenuItem, TextField } from "@material-ui/core";
import { MoreVert as InfoIcon } from "@material-ui/icons";
import Styles from "./styles.column";
import Task from "../Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { deleteColumn, updateColumnInfo } from "../../actions/app";
import DropDown from "../DropDown";
import Modal from "../Modal";

const Column = ({ column, tasks, index }) => {
  const classes = Styles();
  const app = useSelector((state) => state.app);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescribtion] = React.useState("");
  const [selectedId, setSelectedId] = React.useState("");
  const [selectedColumn, setSelectedColumn] = React.useState(undefined);
  const dispatch = useDispatch();

  const handleDeleteList = (id) => {
    dispatch(deleteColumn(app, id));
  };

  const handleUpdate = () => {
    dispatch(updateColumnInfo(app, title, description, selectedId, dispatch));
  };

  const toggleModal = (title = "", description = "", id = undefined) => {
    setTitle(title);
    setDescribtion(description);
    setSelectedId(id);
    setOpen((open) => !open);
  };

  const toggleInfoModal = (column = undefined) => {
    setSelectedColumn(column);
  };

  return (
    <>
      <Modal
        open={open}
        handleSubmit={handleUpdate}
        toggleModal={toggleModal}
        title="Update List"
        disabled={title.length === 0}
      >
        <TextField
          label="List Title"
          variant="outlined"
          autoFocus
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <TextField
          label="Describtion"
          variant="outlined"
          autoFocus
          fullWidth
          value={description}
          onChange={(e) => setDescribtion(e.target.value)}
        />
      </Modal>
      <Modal
        open={selectedColumn !== undefined ? true : false}
        toggleModal={toggleInfoModal}
        title="List Info"
      >
        {selectedColumn && (
          <div>
            <h2>{selectedColumn.title}</h2>
            <p>Describtion : {selectedColumn.description}</p>
            <p>Created At : {selectedColumn.createdAt}</p>
            <p>Last Modified : {selectedColumn.lastModified}</p>
          </div>
        )}
      </Modal>
      <Draggable draggableId={column.id} index={index}>
        {(provided, snapshot) => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            elevation={snapshot.isDragging ? 5 : 0}
            className={classes.root}
          >
            <div className={classes.header}>
              <div>
                <h2>{column.title} </h2>
                <span>{column.description}</span>{" "}
              </div>
              <DropDown button={<InfoIcon />}>
                <MenuItem
                  onClick={() =>
                    toggleModal(column.title, column.description, column.id)
                  }
                >
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleDeleteList(column.id)}>
                  Delete
                </MenuItem>
                <MenuItem onClick={() => toggleInfoModal(column)}>
                  Info
                </MenuItem>
              </DropDown>
            </div>

            <Droppable droppableId={column.id} type={"task"}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={classes.taskContainer}
                >
                  {tasks.map((item, index) => {
                    return <Task index={index} key={item.id} item={item} />;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {provided.placeholder}
          </Paper>
        )}
      </Draggable>
    </>
  );
};
export default Column;
