import {
  UPDATE_COLUMN,
  UPDATE_COLUMN_ORDER,
  NO_CHANGE,
  INITAL_DATA,
  ADD_COLUMN,
  DELETE_COLUMN,
  RAISE_MESSAGE,
} from "../constants/types";

export const initiateData = (tasks) => {
  const d = new Date();
  const data = {
    tasks: tasks,
    columns: {
      "column-1": {
        id: "column-1",
        title: "To Do",
        description: "This is just a todo !",
        taskIds: Object.keys(tasks),
        createdAt: d,
        lastModified: d,
      },
    },
    columnOrders: ["column-1"],
    isInitial: false,
  };

  return {
    type: INITAL_DATA,
    payload: data,
  };
};

export const updateState = (
  app,
  destination,
  source,
  draggableId,
  type,
  dispatch
) => {
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
    return updateColumn(app, source, destination, draggableId, dispatch);
  } else {
    return updateColumnOrder(app, source, destination, draggableId, dispatch);
  }
};

export const deleteColumn = (app, columnId, dispatch) => {
  const copyTaskIds = [...(app.columns[columnId].taskIds || [])];
  const copyOrders = [...app.columnOrders];
  let index = copyOrders.indexOf(columnId);
  copyOrders.splice(index, 1);

  const newColumns = {
    ...app.columns,
    "column-1": {
      ...app.columns["column-1"],
      taskIds: [...app.columns["column-1"].taskIds, ...copyTaskIds],
    },
  };

  delete newColumns[columnId];

  const data = {
    columns: newColumns,
    columnOrders: copyOrders,
  };

  dispatch({ type: RAISE_MESSAGE, payload: `` });

  return {
    type: DELETE_COLUMN,
    payload: data,
  };
};

export const updateColumnInfo = (
  app,
  title,
  description,
  columnId,
  dispatch
) => {
  // console.log(columnId);
  const d = new Date();

  const newData = {
    ...app.columns[columnId],
    title: title,
    description: description,
    lastModified: d,
  };

  dispatch({ type: RAISE_MESSAGE, payload: `${title} List is updated` });

  return {
    type: UPDATE_COLUMN,
    payload: { [columnId]: newData },
  };
};

export const addNewColumn = (title, description, dispatch) => {
  const id = `column-${Math.random()}`;
  const d = new Date();
  const data = {
    [id]: {
      id: id,
      title,
      description: description,
      taskIds: [],
      createdAt: d,
      lastModified: d,
    },
  };

  dispatch({ type: RAISE_MESSAGE, payload: `${title} List is Added` });

  return {
    type: ADD_COLUMN,
    payload: { data, id },
  };
};

export const updateColumn = (
  state,
  source,
  destination,
  draggableId,
  dispatch
) => {
  const start = state.columns[source.droppableId];
  const finish = state.columns[destination.droppableId];
  const d = new Date();

  if (start === finish) {
    const copyTaskIds = [...start.taskIds];
    copyTaskIds.splice(source.index, 1);
    copyTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      taskIds: copyTaskIds,
      lastModified: d.toString(),
    };

    dispatch({
      type: RAISE_MESSAGE,
      payload: `Task #${draggableId} is reorder on List ${
        state.columns[source.droppableId].title
      }`,
    });

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
    lastModified: d.toString(),
  };

  const finishTaskIds = [...finish.taskIds];
  finishTaskIds.splice(destination.index, 0, draggableId);

  const newFinish = {
    ...finish,
    taskIds: finishTaskIds,
    lastModified: d.toString(),
  };

  dispatch({
    type: RAISE_MESSAGE,
    payload: `Task #${draggableId} is moved from List ${
      state.columns[source.droppableId].title
    } to List ${state.columns[destination.droppableId].title}`,
  });

  return {
    type: UPDATE_COLUMN,
    payload: { [newFinish.id]: newFinish, [newStart.id]: newStart },
  };
};

export const updateColumnOrder = (
  state,
  source,
  destination,
  draggableId,
  dispatch
) => {
  const newOrderColumns = [...state.columnOrders];
  newOrderColumns.splice(source.index, 1);
  newOrderColumns.splice(destination.index, 0, draggableId);
  dispatch({
    type: RAISE_MESSAGE,
    payload: `${state.columns[draggableId].title} List is reordered`,
  });
  return {
    type: UPDATE_COLUMN_ORDER,
    payload: newOrderColumns,
  };
};
