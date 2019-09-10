import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { tokenService } from '../../services';
import { axiosInstance, IModalConfigs, setAxiosAuthToken } from '../../utils';
import { IReduxState } from '../store';
import { settingTypes } from '../types';
import { cleanupData } from './data';

export const setMenuOpened = (menuOpened: boolean = false) => {
  return {
    type: settingTypes.menuOpened,
    menuOpened
  };
};

export const setModalConfigs = (configs: IModalConfigs) => {
  return {
    type: settingTypes.setModalConfigs,
    ...configs
  };
};

export const closeModal = () => {
  return {
    type: settingTypes.closeModal
  };
};

export const getCurrentUser:
  ActionCreator<ThunkAction<Promise<Action | void>, IReduxState, void, Action<any>>> = (isLogout: false, callbackFirst, callbackSecond) => {
  return async (dispatch): Promise<Action | void> => {
    if (isLogout) {
      return dispatch({ type: settingTypes.setCurrentUser, user: {} });
    }

    try {
      const { data } = await axiosInstance.get('/user/me');

      if (data.setupComplete) {
        if (typeof callbackSecond === 'function') {
          callbackSecond();
        }
      } else {
        if (typeof callbackFirst === 'function') {
          callbackFirst();
        }
      }

      return dispatch({ type: settingTypes.setCurrentUser, user: data });
    } catch (err) {
      if (err && err.message === 'internet') {
        return Alert.alert('Please check internet connection and try again');
      }

      if (typeof callbackFirst === 'function') {
        return callbackFirst(err);
      }

      Actions.reset('signup_email_pass');
      await tokenService.removeToken();
      dispatch(setIsLoggedIn());

      if (err && err.response && err.response.status === 401) {
        setTimeout(() => Alert.alert('You don\'t have permissions to use this app'), 500);
      }

      return dispatch({ type: settingTypes.setCurrentUser, user: {} });
    }
  };
};

export const setIsLoggedIn: ActionCreator<ThunkAction<Promise<Action | void>, IReduxState, void, Action<any>>> = (callbackFirst, callbackSecond) => {
  return async (dispatch): Promise<Action | void> => {
    if (!tokenService.token) {
      dispatch(cleanupData());
      dispatch(getCurrentUser(true));
      setAxiosAuthToken('');
      return dispatch({ type: settingTypes.setIsLoggedIn, isLoggedIn: false });
    }

    setAxiosAuthToken(tokenService.token);

    dispatch({ type: settingTypes.setIsLoggedIn, isLoggedIn: true });

    return dispatch(getCurrentUser(false, callbackFirst, callbackSecond));
  };
};