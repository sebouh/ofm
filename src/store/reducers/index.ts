import { combineReducers } from 'redux';
import camera from './camera';
import data from './data';
import router from './router';
import settings from './settings';

export default combineReducers({
  settings,
  router,
  camera,
  data
});