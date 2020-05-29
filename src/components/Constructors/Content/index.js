import React, { useEffect, Fragment } from "react";
import Styles from "./style.content";
import { useSelector, useDispatch } from "react-redux";
import Column from "../Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { updateState } from "../../../actions/app";

const Content = () => {
  const classes = Styles();
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(app));
  }, [app]);

  const onDragEnd = (res) => {
    const { destination, source, draggableId, type } = res;
    dispatch(updateState(app, destination, source, draggableId, type));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction={"horizontal"} droppableId="all-app" type={"column"}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.listWrapper}
          >
            {app &&
              app.columnOrders.map((item, index) => {
                let column = app.columns[item];
                let tasks = column.taskIds.map((item) => app.tasks[item]);

                return (
                  <Column
                    index={index}
                    key={column.id}
                    tasks={tasks}
                    column={column}
                  />
                );
              })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Content;
