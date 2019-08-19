import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { tokenService } from '../../services';
import { axiosInstance, IModalConfigs, setAxiosAuthToken } from '../../utils';
import { IReduxState } from '../store';
import { settingTypes } from '../types';

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

export const getCurrentUser: ActionCreator<ThunkAction<Promise<Action>, IReduxState, void, Action<any>>> = (isLogout: false) => {
  return async (dispatch): Promise<Action> => {
    if (isLogout) {
      return dispatch({ type: settingTypes.setCurrentUser, user: {} });
    }

    try {
      const { data } = await axiosInstance.get('/user/me');

      return dispatch({ type: settingTypes.setCurrentUser, user: data });
    } catch (err) {
      return dispatch({ type: settingTypes.setCurrentUser, user: {} });
    }
  };
};

export const setIsLoggedIn: ActionCreator<ThunkAction<Promise<Action>, IReduxState, void, Action<any>>> = () => {
  return async (dispatch): Promise<Action> => {
    if (!tokenService.token) {
      dispatch(getCurrentUser(true));
      setAxiosAuthToken('');
      return dispatch({ type: settingTypes.setIsLoggedIn, isLoggedIn: false });
    }

    setAxiosAuthToken(tokenService.token);

    dispatch({ type: settingTypes.setIsLoggedIn, isLoggedIn: true });

    return dispatch(getCurrentUser());
  };
};