import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { axiosInstance } from '../../utils';
import { IReduxState } from '../store';
import { dataTypes } from '../types';

export const updateQuestion = (id: number, payload: object) => {
  return {
    type: dataTypes.updateQuestion,
    id,
    payload
  };
};

export const getQuestions: ActionCreator<ThunkAction<Promise<Action | void>, IReduxState, void, Action<any>>> = () => {
  return async (dispatch): Promise<Action | void> => {
    try {
      const { data } = await axiosInstance.post('/questions', { date: new Date().toISOString() });

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
};

export const getOpenPositions: ActionCreator<ThunkAction<Promise<Action>, IReduxState, void, Action<any>>> = () => {
  return async (dispatch): Promise<Action> => {
    try {
      const { data } = await axiosInstance.get('/referal/open-positions');

      return dispatch({ type: dataTypes.setPositions, positions: data.openPositions || [] });
    } catch (e) {
      return dispatch({ type: dataTypes.setPositions, positions: [] });
    }
  };
};

export const getPositionUrl: ActionCreator<ThunkAction<Promise<Action>, IReduxState, void, Action<any>>> = (id: number) => {
  return async (dispatch): Promise<Action> => {
    try {
      const { data } = await axiosInstance.get(`/referal/referral-link?position=${id}`);

      return dispatch({ type: dataTypes.updateQuestion, id, payload: { url: data } });
    } catch (e) {
      return dispatch({ type: dataTypes.updateQuestion, id, payload: {} });
    }
  };
};