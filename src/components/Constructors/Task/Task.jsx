import React, { memo, lazy } from "react";
import Styles from "./Task.style";
import { Paper } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

const InfoTaskModal = lazy(() => import("../../InfoTaskModal"));

const Task = ({ item, index, columnId }) => {
  const classes = Styles();
  const [open, setOpen] = React.useState(false);

  const toggleModal = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      {open && (
        <InfoTaskModal
          columnId={columnId}
          open={open}
          toggleModal={toggleModal}
          task={item}
        />
      )}
      <Draggable draggableId={item.id} index={index}>
        {(provied, snapShot) => (
          <Paper
            {...provied.draggableProps}
            {...provied.dragHandleProps}
            ref={provied.innerRef}
            elevation={snapShot.isDragging ? 5 : 0}
            className={classes.root}
            onDoubleClick={toggleModal}
          >
            {item.content}
          </Paper>
        )}
      </Draggable>
    </>
  );
};

export default memo(Task);
