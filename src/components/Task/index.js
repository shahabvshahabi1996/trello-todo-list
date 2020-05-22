import React, { memo } from "react";
import Styles from "./style.task";
import { Paper } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ item, index }) => {
  const classes = Styles();

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provied, snapShot) => (
        <Paper
          {...provied.draggableProps}
          {...provied.dragHandleProps}
          ref={provied.innerRef}
          elevation={snapShot.isDragging ? 5 : 0}
          className={classes.root}
        >
          {item.content}
        </Paper>
      )}
    </Draggable>
  );
};

export default memo(Task);
