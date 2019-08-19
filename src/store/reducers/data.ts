import { AnyAction } from 'redux';
import { IQuestions, IReferalPositions } from '../../utils';
import { createReducer } from '../store';
import { dataTypes } from '../types';

export interface IDataState {
  readonly questions: IQuestions[];
  readonly positions: IReferalPositions[];
}

const defaultState: IDataState = {
  questions: [
    {
      id: 1,
      duration: 2.52,
      pictureRequired: true,
      question: 'Are storefront doors and windows clean and free of cracks?',
      value: 5
    },
    {
      id: 2,
      duration: 0,
      pictureRequired: false,
      question: 'Are storefront doors and windows clean and free of cracks?',
      value: 25
    },
    {
      id: 3,
      duration: 0,
      pictureRequired: false,
      question: 'Are storefront doors and windows clean and free of cracks?',
      value: 15
    },
    {
      id: 4,
      duration: 0,
      pictureRequired: true,
      question: 'Are storefront doors and windows clean and free of cracks?',
      value: 5
    },
    {
      id: 5,
      duration: 0,
      pictureRequired: false,
      question: 'Are storefront doors and windows clean and free of cracks?',
      value: 25
    },
    {
      id: 6,
      duration: 0,
      pictureRequired: false,
      question: 'Are storefront doors and windows clean and free of cracks?',
      value: 15
    }
  ],
  positions: []
};

export default createReducer(defaultState, {
  [dataTypes.setQuestions]: (state: IDataState, { questions }: AnyAction) => ({
    ...state,
    questions
  }),
  [dataTypes.updateQuestion]: (state: IDataState, { id, payload }: AnyAction) => {
    const questions = state.questions.map(el => el);
    const questionIndex = questions.findIndex(el => el.id === id);

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
  [dataTypes.setPositions]: (state: IDataState, { positions }: AnyAction) => ({
    ...state,
    positions
  }),
  [dataTypes.updateQuestion]: (state: IDataState, { id, payload }: AnyAction) => {
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
  }
});