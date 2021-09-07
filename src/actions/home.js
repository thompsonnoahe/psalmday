import { types } from '../types/types';

export const setSelectedText = text => {
  return {
    type: types.SET_SELECTED_TEXT,
    payload: text,
  };
};
