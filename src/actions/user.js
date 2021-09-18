import psalmday from '../apis/psalmday';
import { types } from '../types/types';

export const getFavoritePsalms = userId => async dispatch => {
  const { data } = await psalmday.get(`/users/${userId}`);

  dispatch({
    type: types.GET_FAVORITE_PSALMS,
    payload: data?.user_data?.favorite_psalms || [],
  });
};

export const setFavoritePsalms = (userId, psalmNumbers) => async dispatch => {
  const { data } = await psalmday.patch(`/users/${userId}/userData`, {
    user_data: {
      favorite_psalms: psalmNumbers,
    },
  });

  dispatch({
    type: types.SET_FAVORITE_PSALMS,
    payload: data?.user_data?.favorite_psalms,
  });
};

export const getSavedVerses = userId => async dispatch => {
  const { data } = await psalmday.get(`/users/${userId}`);
  dispatch({
    type: types.GET_SAVED_VERSES,
    payload: data?.user_data?.saved_verses || [],
  });
};

export const setSavedVerses = (userId, verses) => async dispatch => {
  const { data } = await psalmday.patch(`/users/${userId}/userData`, {
    user_data: {
      saved_verses: verses,
    },
  });
  dispatch({
    type: types.SET_SAVED_VERSES,
    payload: data?.user_data?.saved_verses,
  });
};
