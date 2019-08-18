import { combineReducers } from 'redux';
import camera from './camera';
import questions from './questions';
import router from './router';
import settings from './settings';

export default combineReducers({
  settings,
  router,
  camera,
  questions
});