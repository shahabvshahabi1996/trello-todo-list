import {
  UPDATE_COLUMN,
  UPDATE_TASK,
  UPDATE_COLUMN_ORDER,
} from "../constants/types";

export const updateTasks = (tasks) => ({ type: UPDATE_TASK, payload: tasks });

export const updateColumn = (columns) => {
  return {
    type: UPDATE_COLUMN,
    payload: columns,
  };
};

export const updateColumnOrder = (columns) => {
  return {
    type: UPDATE_COLUMN_ORDER,
    payload: columns,
  };
};
