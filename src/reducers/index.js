import { combineReducers } from 'redux';
import { selectedTextReducer } from './homeReducers';
import { randomPsalmReducer } from './psalmReducers';
import { favoritePsalmReducer, savedVerseReducer } from './userReducers';

export default combineReducers({
  randomPsalm: randomPsalmReducer,
  selectedVerse: selectedTextReducer,
  favoritePsalms: favoritePsalmReducer,
  savedVerses: savedVerseReducer,
});
