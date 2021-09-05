import { combineReducers } from 'redux';
import { randomPsalmReducer } from './psalmReducers';

export default combineReducers({
  randomPsalm: randomPsalmReducer,
});
