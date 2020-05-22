import {
  UPDATE_COLUMN,
  UPDATE_TASK,
  UPDATE_COLUMN_ORDER,
} from "../constants/types";

const INITAL = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Doing Homework",
    },
    "task-2": {
      id: "task-2",
      content: "Doing Tasks",
    },
    "task-3": {
      id: "task-3",
      content: "Doing Assignments",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrders: ["column-1", "column-2", "column-3"],
};

export default (state = INITAL, action) => {
  switch (action.type) {
    case UPDATE_TASK: {
      return {
        ...state,
        tasks: action.payload,
      };
    }

    case UPDATE_COLUMN: {
      return {
        ...state,
        columns: action.payload,
      };
    }

    case UPDATE_COLUMN_ORDER: {
      return {
        ...state,
        columnOrders: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
