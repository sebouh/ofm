import { AnyAction } from 'redux';
import { IModalConfigs, IUser } from '../../utils';
import { createReducer } from '../store';
import { settingTypes } from '../types';

export interface ISettingsState {
  readonly locale: string;
  readonly modal: IModalConfigs;
  readonly isLoggedIn: boolean | undefined;
  readonly user: IUser;
}

const defaultState: ISettingsState = {
  locale: 'en',
  modal: {
    isVisible: false,
    title: '',
    message: '',
    icon: '',
    confirm: false,
    event: ''
  },
  isLoggedIn: undefined,
  user: {} as IUser
};

export default createReducer(defaultState, {
  [settingTypes.setLocale]: (state: ISettingsState, { locale }: AnyAction) => ({
    ...state,
    locale
  }),
  [settingTypes.setIsLoggedIn]: (state: ISettingsState, { isLoggedIn }: AnyAction) => ({
    ...state,
    isLoggedIn
  }),
  [settingTypes.setCurrentUser]: (state: ISettingsState, { user }: AnyAction) => ({
    ...state,
    user
  }),
  [settingTypes.setModalConfigs]: (state: ISettingsState, { isVisible, title, message, icon, confirm, event }: AnyAction) => ({
    ...state,
    modal: {
      ...state.modal,
      isVisible,
      title,
      message,
      icon,
      confirm,
      event
    }
  }),
  [settingTypes.closeModal]: (state: ISettingsState) => ({
    ...state,
    modal: {
      ...state.modal,
      isVisible: false
    }
  })
});