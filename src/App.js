import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import initialData from "./constants/initial-data";
import Column from "./components/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateColumn, updateTasks, updateColumnOrder } from "./actions/app";

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

  const handleTaskDrag = (state, source, destination, draggableId) => {
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const copyTaskIds = [...start.taskIds];
      copyTaskIds.splice(source.index, 1);
      copyTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: copyTaskIds,
      };

      dispatch(updateColumn({ [destination.droppableId]: newColumn }));

      return;
    }

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = [...finish.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    dispatch(
      updateColumn({ [newFinish.id]: newFinish, [newStart.id]: newStart })
    );
    return;
  };

  const handleColumnDrag = (state, source, destination, draggableId) => {
    const newOrderColumns = [...state.columnOrders];
    newOrderColumns.splice(source.index, 1);
    newOrderColumns.splice(destination.index, 0, draggableId);
    dispatch(updateColumnOrder(newOrderColumns));
  };

  const onDragEnd = (res) => {
    const { destination, source, draggableId, type } = res;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "task") {
      handleTaskDrag(app, source, destination, draggableId);
    } else {
      handleColumnDrag(app, source, destination, draggableId);
    }
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
