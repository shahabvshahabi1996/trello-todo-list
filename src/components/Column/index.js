import React from "react";
import { Paper } from "@material-ui/core";
import Styles from "./styles.column";
import Task from "../Task";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  const classes = Styles();
  return (
    <Paper elevation={0} className={classes.root}>
      <h2 className={classes.header}>{column.title}</h2>
      <Droppable droppableId={column.id}>
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
    </Paper>
  );
};
export default Column;
