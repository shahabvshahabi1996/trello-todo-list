import React from "react";
import { Paper } from "@material-ui/core";
import Styles from "./styles.column";
import Task from "../Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = ({ column, tasks, index }) => {
  const classes = Styles();
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Paper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          elevation={snapshot.isDragging ? 5 : 0}
          className={classes.root}
        >
          <h2 className={classes.header}>{column.title}</h2>
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
  );
};
export default Column;
