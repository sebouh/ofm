import { AnyAction } from 'redux';
import { IQuestions, IRedeem, IReferalPositions } from '../../utils';
import { createReducer } from '../store';
import { dataTypes } from '../types';

export interface IDataState {
  readonly questions: IQuestions[];
  readonly positions: IReferalPositions[];
  readonly redeem: IRedeem;
}

const defaultState: IDataState = {
  questions: [],
  positions: [],
  redeem: {} as IRedeem
};

export default createReducer(defaultState, {
  [dataTypes.setQuestions]: (state: IDataState, { questions }: AnyAction) => ({
    ...state,
    questions
  }),
  [dataTypes.updateQuestion]: (state: IDataState, { id, payload }: AnyAction) => {
    const questions = state.questions.map(el => el);
    const questionIndex = questions.findIndex(el => el.question.id === id);

    if (questionIndex < 0) {
      return {
        ...state
      };
    }

    questions[questionIndex] = {
      ...questions[questionIndex],
      ...payload
    };

    return {
      ...state,
      questions
    };
  },
  [dataTypes.deleteQuestion]: (state: IDataState, { id }: AnyAction) => {
    const questions = state.questions.filter(el => el.id !== id);

    return {
      ...state,
      questions
    };
  },
  [dataTypes.setPositions]: (state: IDataState, { positions }: AnyAction) => ({
    ...state,
    positions
  }),
  [dataTypes.updatePosition]: (state: IDataState, { id, payload }: AnyAction) => {
    const positions = state.positions.map(el => el);
    const positionIndex = positions.findIndex(el => el.id === id);

    if (positionIndex < 0) {
      return state;
    }

    positions[positionIndex] = {
      ...positions[positionIndex],
      ...payload
    };

    return {
      ...state,
      positions
    };
  },
  [dataTypes.setRedeem]: (state: IDataState, { redeem }: AnyAction) => ({
    ...state,
    redeem
  })
});