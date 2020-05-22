import {
  UPDATE_COLUMN,
  UPDATE_TASK,
  UPDATE_COLUMN_ORDER,
  NO_CHANGE,
} from "../constants/types";

export const updateState = (app, destination, source, draggableId, type) => {
  if (
    !destination ||
    (destination.droppableId === source.droppableId &&
      destination.index === source.index)
  ) {
    return {
      type: NO_CHANGE,
    };
  }

  if (type === "task") {
    return updateColumn(app, source, destination, draggableId);
  } else {
    return updateColumnOrder(app, source, destination, draggableId);
  }
};

export const updateTasks = (tasks) => ({ type: UPDATE_TASK, payload: tasks });

export const updateColumn = (state, source, destination, draggableId) => {
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

    return {
      type: UPDATE_COLUMN,
      payload: { [destination.droppableId]: newColumn },
    };
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

  return {
    type: UPDATE_COLUMN,
    payload: { [newFinish.id]: newFinish, [newStart.id]: newStart },
  };
};

export const updateColumnOrder = (state, source, destination, draggableId) => {
  const newOrderColumns = [...state.columnOrders];
  newOrderColumns.splice(source.index, 1);
  newOrderColumns.splice(destination.index, 0, draggableId);
  return {
    type: UPDATE_COLUMN_ORDER,
    payload: newOrderColumns,
  };
};
