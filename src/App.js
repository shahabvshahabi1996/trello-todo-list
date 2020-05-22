import React from "react";
import { makeStyles } from "@material-ui/core";
import initialData from "./constants/initial-data";
import Column from "./components/Column";
import { DragDropContext } from "react-beautiful-dnd";

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

  const onDragEnd = (res) => {
    const { destenation, srouce, draggableId } = res;
    console.log(res);
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
