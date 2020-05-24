import {
  UPDATE_COLUMN,
  UPDATE_COLUMN_ORDER,
  NO_CHANGE,
  INITAL_DATA,
  ADD_COLUMN,
  DELETE_COLUMN,
  RAISE_MESSAGE,
  UPDATE_TASK,
  ADD_TASK,
  DELETE_TASK,
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

export const deleteColumn = (app, columnId) => {
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

  return (dispatch) => {
    dispatch({
      type: RAISE_MESSAGE,
      payload: `${app.columns[columnId].title} is deleted!`,
    });

    dispatch({
      type: DELETE_COLUMN,
      payload: data,
    });
  };
};

export const updateColumnInfo = (app, title, description, columnId) => {
  // console.log(columnId);
  return (dispatch) => {
    const d = new Date();

    const newData = {
      ...app.columns[columnId],
      title: title,
      description: description,
      lastModified: d,
    };

    dispatch({ type: RAISE_MESSAGE, payload: `${title} is updated` });
    dispatch({ type: UPDATE_COLUMN, payload: { [columnId]: newData } });
  };
};

export const addNewColumn = (title, description) => {
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

  return (dispatch) => {
    dispatch({ type: RAISE_MESSAGE, payload: `${title} is Added` });
    dispatch({ type: ADD_COLUMN, payload: { data, id } });
  };
};

export const updateColumn = (state, source, destination, draggableId) => {
  const start = state.columns[source.droppableId];
  const finish = state.columns[destination.droppableId];
  const d = new Date();

  return (dispatch) => {
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
        payload: `Task #${draggableId} is reorder on ${
          state.columns[source.droppableId].title
        }`,
      });
      dispatch({
        type: UPDATE_COLUMN,
        payload: { [destination.droppableId]: newColumn },
      });
      return;
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
      payload: `Task #${draggableId} is moved from ${
        state.columns[source.droppableId].title
      } to ${state.columns[destination.droppableId].title}`,
    });

    dispatch({
      type: UPDATE_COLUMN,
      payload: { [newFinish.id]: newFinish, [newStart.id]: newStart },
    });
  };
};

export const updateColumnOrder = (state, source, destination, draggableId) => {
  const newOrderColumns = [...state.columnOrders];
  newOrderColumns.splice(source.index, 1);
  newOrderColumns.splice(destination.index, 0, draggableId);
  return (dispatch) => {
    dispatch({
      type: RAISE_MESSAGE,
      payload: `${state.columns[draggableId].title} is reordered`,
    });
    dispatch({ type: UPDATE_COLUMN_ORDER, payload: newOrderColumns });
  };
};

export const updateTask = (app, columnId, content, taskId = undefined) => {
  return (dispatch) => {
    if (taskId) {
      dispatch({
        type: RAISE_MESSAGE,
        payload: `#${taskId} on ${app.columns[columnId].title} is updated`,
      });
      dispatch({
        type: UPDATE_TASK,
        payload: { [taskId]: { ...app.tasks[taskId], content: content } },
      });
      return;
    }

    const newId = `task-${Math.random()}`;
    const d = new Date();
    dispatch({
      type: RAISE_MESSAGE,
      payload: `#${newId} is added to ${app.columns[columnId].title}`,
    });
    dispatch({
      type: ADD_TASK,
      payload: {
        task: {
          id: newId,
          content: content,
        },
        column: {
          [columnId]: {
            ...app.columns[columnId],
            lastModified: d.toString(),
            taskIds: [...app.columns[columnId].taskIds, newId],
          },
        },
      },
    });
  };
};

export const deleteTask = (app, columnId, taskId) => {
  return (dispatch) => {
    const copyTasks = { ...app.tasks };
    delete copyTasks[taskId];
    const copyTaskIds = [...app.columns[columnId].taskIds];
    const index = copyTaskIds.indexOf(taskId);
    copyTaskIds.splice(index, 1);

    dispatch({
      type: RAISE_MESSAGE,
      payload: `#${taskId} on ${app.columns[columnId].title} is deleted!`,
    });

    dispatch({
      type: DELETE_TASK,
      payload: {
        ...app,
        tasks: copyTasks,
        columns: {
          ...app.columns,
          [columnId]: {
            ...app.columns[columnId],
            taskIds: copyTaskIds,
          },
        },
      },
    });
  };
};
