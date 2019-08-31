import { AnyAction } from 'redux';
import { IQuestions, IQuestionsExtra, IRedeem, IReferalPositions } from '../../utils';
import { createReducer } from '../store';
import { dataTypes } from '../types';

export interface IDataState {
  readonly questions: IQuestions[];
  readonly questionsExtra: IQuestionsExtra[];
  readonly positions: IReferalPositions[];
  readonly redeem: IRedeem;
}

const defaultState: IDataState = {
  questions: [],
  questionsExtra: [],
  positions: [],
  redeem: {} as IRedeem
};

export default createReducer(defaultState, {
  [dataTypes.cleanupData]: () => ({
    ...defaultState
  }),
  [dataTypes.setQuestions]: (state: IDataState, { questions }: AnyAction) => ({
    ...state,
    questions
  }),
  [dataTypes.updateQuestion]: (state: IDataState, { id, payload }: AnyAction) => {
    const questionsExtra = state.questionsExtra.map(el => el);
    const question = state.questions.find(el => el.question.id === id);

    if (!question) {
      return state;
    }

    const data = { id: question.id, ...payload };

    if (!state.questionsExtra.some(el => el.id === question.id)) {
      questionsExtra.push(data);
    } else {
      const extraIndex = questionsExtra.findIndex(el => el.id === question.id);
      questionsExtra[extraIndex] = {
        ...questionsExtra[extraIndex],
        ...payload
      };
    }

    return {
      ...state,
      questionsExtra
    };
  },
  [dataTypes.deleteQuestion]: (state: IDataState, { id }: AnyAction) => {
    const questions = state.questions.filter(el => el.id !== id);
    const questionsExtra = state.questionsExtra.filter(el => el.id !== id);

    return {
      ...state,
      questions,
      questionsExtra
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