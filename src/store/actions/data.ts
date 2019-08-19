import { dataTypes } from '../types';

export const updateQuestion = (id: number, payload: object) => {
  return {
    type: dataTypes.updateQuestion,
    id,
    payload
  };
};