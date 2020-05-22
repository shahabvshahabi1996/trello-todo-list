import { RAISE_MESSAGE } from "../constants/types";

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

    default: {
      return state;
    }
  }
};
