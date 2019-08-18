import { Action, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ICameraState } from './reducers/camera';
import { IQuestionState } from './reducers/questions';
import { IRouterState } from './reducers/router';
import { ISettingsState } from './reducers/settings';

export interface IReduxState {
  readonly settings: ISettingsState;
  readonly router: IRouterState;
  readonly camera: ICameraState;
  readonly questions: IQuestionState;
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export function createReducer(initialState: any, handlers: any) {
  return function reducer(state: any = initialState, action: Action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

export default store;