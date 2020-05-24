import React, { useCallback } from "react";
import { Paper, MenuItem, TextField, Button, Box } from "@material-ui/core";
import { MoreVert as InfoIcon, Add as AddIcon } from "@material-ui/icons";
import Styles from "./styles.column";
import Task from "../Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { deleteColumn, updateColumnInfo } from "../../actions/app";
import DropDown from "../DropDown";
import Modal from "../Modal";
import UpdateColumnModal from "../UpdateColumnModal";
import InfoColumnModal from "../InfoColumnModal";

const Column = ({ column, tasks, index }) => {
  const classes = Styles();
  const app = useSelector((state) => state.app);
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [selectedColumn, setSelectedColumn] = React.useState(undefined);
  const dispatch = useDispatch();

  const handleDeleteList = (id) => {
    dispatch(deleteColumn(app, id));
  };

  const handleUpdate = (title, description) => {
    dispatch(updateColumnInfo(app, title, description, selectedColumn.id));
  };

  const toggleModal = (column = undefined) => {
    setSelectedColumn(column);
    setOpen((open) => !open);
  };

  const toggleInfoModal = (column = undefined) => {
    setOpenInfo((open) => !open);
    setSelectedColumn(column);
  };

  return (
    <>
      <UpdateColumnModal
        open={open}
        handleSubmit={handleUpdate}
        toggleModal={toggleModal}
        title={selectedColumn ? selectedColumn.title : ""}
        description={selectedColumn ? selectedColumn.description : ""}
      />
      <InfoColumnModal
        open={openInfo}
        selectedColumn={selectedColumn}
        toggleModal={toggleInfoModal}
      />
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
                <MenuItem onClick={() => toggleModal(column)}>Edit</MenuItem>
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
            <Box padding={1}>
              <Button color="primary">
                <AddIcon /> Add New card
              </Button>
            </Box>
          </Paper>
        )}
      </Draggable>
    </>
  );
};
export default Column;
