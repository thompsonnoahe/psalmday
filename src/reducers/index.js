import { combineReducers } from 'redux';
import { selectedTextReducer } from './homeReducers';
import { randomPsalmReducer } from './psalmReducers';

export default combineReducers({
  randomPsalm: randomPsalmReducer,
  selectedVerse: selectedTextReducer,
});
