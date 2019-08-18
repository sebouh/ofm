import { AnyAction } from 'redux';
import { createReducer } from '../store';
import { cameraTypes } from '../types';

export interface ICameraState {
  readonly isActive: boolean;
  readonly activeQuestionId: number | null;
}

const defaultState: ICameraState = {
  isActive: false,
  activeQuestionId: null
};

export default createReducer(defaultState, {
  [cameraTypes.setCameraStatus]: (state: ICameraState, { isActive }: AnyAction) => ({
    ...state,
    isActive
  }),
  [cameraTypes.setActiveQuestionId]: (state: ICameraState, { activeQuestionId }: AnyAction) => ({
    ...state,
    activeQuestionId
  })
});