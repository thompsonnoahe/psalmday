import { types } from '../types/types';

export const setSelectedText = verse => {
  return {
    type: types.SET_SELECTED_TEXT,
    payload: verse,
  };
};
