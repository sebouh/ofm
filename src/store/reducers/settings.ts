import { AnyAction } from 'redux';
import { createReducer } from '../store';
import { settingTypes } from '../types';

export interface ISettingsState {
  readonly locale: string;
}

const defaultState: ISettingsState = {
  locale: 'en'
};

export default createReducer(defaultState, {
  [settingTypes.setLocale]: (state: ISettingsState, { locale }: AnyAction) => ({
    ...state,
    locale
  })
});