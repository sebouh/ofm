import { ActionConst } from 'react-native-router-flux';
import { AnyAction } from 'redux';
import { createReducer } from '../store';

export interface IRouterState {
  readonly routeName: string;
  readonly prevRoute: string;
}

const initialState: IRouterState = {
  routeName: '',
  prevRoute: ''
};

const callback = (state: IRouterState, { routeName }: AnyAction) => {
  let prevRoute = state.routeName;

  if (routeName === 'main_dashboard' || routeName === 'redeem_initial') {
    prevRoute = '';
  }

  return {
    ...state,
    routeName,
    prevRoute
  };
};

export default createReducer(initialState, {
  [ActionConst.FOCUS]: callback,
  [ActionConst.JUMP]: callback,
  [ActionConst.PUSH]: callback,
  [ActionConst.PUSH_OR_POP]: callback,
  [ActionConst.REPLACE]: callback,
  [ActionConst.BACK]: callback,
  [ActionConst.BACK_ACTION]: callback,
  [ActionConst.POP_TO]: callback,
  [ActionConst.REFRESH]: callback,
  [ActionConst.RESET]: callback,
  [ActionConst.BLUR]: callback,
  [ActionConst.ANDROID_BACK]: callback,
});