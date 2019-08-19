import { AnyAction } from 'redux';
import { createReducer } from '../store';
import { registerTypes } from '../types';

export interface IRegisterState {
  readonly token: string;
}

const defaultState: IRegisterState = {
  token: ''
};

export default createReducer(defaultState, {
  [registerTypes.setRegisterToken]: (state: IRegisterState, { token }: AnyAction) => ({
    ...state,
    token
  })
});