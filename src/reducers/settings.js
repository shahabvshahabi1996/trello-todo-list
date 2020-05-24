import { RAISE_MESSAGE, DELETE_MESSAGE } from "../constants/types";

const INITIAL = {
  message: "",
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case RAISE_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }

    case DELETE_MESSAGE: {
      return {
        ...state,
        message: "",
      };
    }

    default: {
      return state;
    }
  }
};
