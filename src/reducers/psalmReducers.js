import { types } from '../types/types';

export const randomPsalmReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_RANDOM_PSALM:
      return action.payload;
    default:
      return state;
  }
};
