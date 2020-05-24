import {
  UPDATE_COLUMN,
  UPDATE_COLUMN_ORDER,
  NO_CHANGE,
  INITAL_DATA,
  ADD_COLUMN,
  DELETE_COLUMN,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from "../constants/types";

const INITAL = {
  ...(localStorage.getItem("state")
    ? JSON.parse(localStorage.getItem("state"))
    : {
        tasks: {},
        columns: {
          "column-1": {
            id: "column-1",
            title: "To Do",
            taskIds: [],
          },
        },
        columnOrders: ["column-1"],
        isInitial: true,
      }),
};

export default (state = INITAL, action) => {
  switch (action.type) {
    case UPDATE_TASK: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          ...action.payload,
        },
      };
    }

    case ADD_TASK: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.task.id]: {
            ...action.payload.task,
          },
        },
        columns: {
          ...state.columns,
          ...action.payload.column,
        },
      };
    }

    case DELETE_TASK: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case ADD_COLUMN: {
      return {
        ...state,
        columns: {
          ...state.columns,
          ...action.payload.data,
        },
        columnOrders: [...state.columnOrders, action.payload.id],
      };
    }

    case UPDATE_COLUMN: {
      return {
        ...state,
        columns: {
          ...state.columns,
          ...action.payload,
        },
      };
    }

    case DELETE_COLUMN: {
      return {
        ...state,
        columns: action.payload.columns,
        columnOrders: action.payload.columnOrders,
      };
    }

    case UPDATE_COLUMN_ORDER: {
      return {
        ...state,
        columnOrders: action.payload,
      };
    }

    case INITAL_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case NO_CHANGE: {
      return state;
    }

    default: {
      return state;
    }
  }
};
