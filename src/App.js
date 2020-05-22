import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Column from "./components/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateState } from "./actions/app";

const Styels = makeStyles((theme) => ({
  AppWrapper: {
    ...theme.typography.body1,
    width: "100vw",
    height: "100vh",
    overflowY: "auto",
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "no-wrap",
  },
}));

const App = () => {
  const classes = Styels();
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
            className={classes.AppWrapper}
          >
            {app.columnOrders.map((item, index) => {
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

export default App;
