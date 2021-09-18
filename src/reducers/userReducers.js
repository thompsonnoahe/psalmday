import { types } from '../types/types';

export const favoritePsalmReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_FAVORITE_PSALMS:
      return action.payload;
    case types.SET_FAVORITE_PSALMS:
      return [...action.payload];
    default:
      return state;
  }
};

export const savedVerseReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_SAVED_VERSES:
      return action.payload;
    case types.SET_SAVED_VERSES:
      return [...action.payload];
    default:
      return state;
  }
};
