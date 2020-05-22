import {
  UPDATE_COLUMN,
  UPDATE_TASK,
  UPDATE_COLUMN_ORDER,
  NO_CHANGE,
} from "../constants/types";

const INITAL = {
  ...(JSON.parse(localStorage.getItem("state")) || {
    tasks: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "To Do",
        taskIds: [],
      },
    },
    columnOrders: ["column-1"],
  }),
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
        columns: {
          ...state.columns,
          ...action.payload,
        },
      };
    }

    case UPDATE_COLUMN_ORDER: {
      return {
        ...state,
        columnOrders: action.payload,
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
