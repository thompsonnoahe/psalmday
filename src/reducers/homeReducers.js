import { types } from '../types/types';

export const selectedTextReducer = (state = '', action) => {
  switch (action.type) {
    case types.SET_SELECTED_TEXT:
      return action.payload;
    default:
      return state;
  }
};
