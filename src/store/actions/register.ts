import { registerTypes } from '../types';

export const setRegisterToken = (token: string) => {
  return {
    type: registerTypes.setRegisterToken,
    token
  };
};