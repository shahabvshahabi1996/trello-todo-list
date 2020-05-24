import { DELETE_MESSAGE } from "../constants/types";

export const emptyMessage = () => {
  return {
    type: DELETE_MESSAGE,
  };
};
