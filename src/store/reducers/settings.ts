import { AnyAction } from 'redux';
import { IModalConfigs } from '../../utils';
import { createReducer } from '../store';
import { settingTypes } from '../types';

export interface ISettingsState {
  readonly locale: string;
  readonly modal: IModalConfigs;
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
};

export default createReducer(defaultState, {
  [settingTypes.setLocale]: (state: ISettingsState, { locale }: AnyAction) => ({
    ...state,
    locale
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