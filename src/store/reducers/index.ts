import { combineReducers } from 'redux';
import router from './router';
import settings from './settings';

export default combineReducers({
  settings,
  router
});