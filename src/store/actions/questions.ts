import { questionTypes } from '../types';

export const updateQuestion = (id: number, payload: object) => {
  return {
    type: questionTypes.updateQuestion,
    id,
    payload
  };
};