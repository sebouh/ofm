import { AnyAction } from 'redux';
import { IQuestions } from '../../utils';
import { createReducer } from '../store';
import { questionTypes } from '../types';

export interface IQuestionState {
  questions: IQuestions[];
}

const defaultState: IQuestionState = {
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
  ]
};

export default createReducer(defaultState, {
  [questionTypes.setQuestions]: (state: IQuestionState, { questions }: AnyAction) => ({
    ...state,
    questions
  }),
  [questionTypes.updateQuestion]: (state: IQuestionState, { id, payload }: AnyAction) => {
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
  }
});