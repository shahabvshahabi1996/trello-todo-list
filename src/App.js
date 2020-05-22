import React from "react";
import { makeStyles } from "@material-ui/core";
import initialData from "./constants/initial-data";
import Column from "./components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

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
  const [state, setState] = React.useState(initialData);
  const app = useSelector((state) => state.app);

  console.log(app);

  const onDragEnd = (res) => {
    const { destination, source, draggableId } = res;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
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

      setState((state) => ({
        ...state,
        columns: {
          ...state.columns,
          [destination.droppableId]: newColumn,
        },
      }));

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

    setState((state) => ({
      ...state,
      columns: {
        ...state.columns,
        [newFinish.id]: newFinish,
        [newStart.id]: newStart,
      },
    }));
  };

  return (
    <div className={classes.AppWrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrders.map((item) => {
          let column = state.columns[item];
          let tasks = column.taskIds.map((item) => state.tasks[item]);

          return <Column key={column.id} tasks={tasks} column={column} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default App;
