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

export const deleteQuestion = (id: number) => {
  return {
    type: dataTypes.deleteQuestion,
    id
  };
};

export const getQuestions: ActionCreator<ThunkAction<Promise<Action>, IReduxState, void, Action<any>>> = (callback?: () => void) => {
  return async (dispatch): Promise<Action> => {
    try {
      const { data } = await axiosInstance.post('/questions', { zonedDateTime: new Date().toISOString() });

      return dispatch({ type: dataTypes.setQuestions, questions: data });
    } catch (e) {
      console.log(e);
      return dispatch({ type: dataTypes.setQuestions, questions: [] });
    } finally {
      if (typeof callback === 'function') {
        setTimeout(() => callback(), 1000);
      }
    }
  };
};

export const getOpenPositions: ActionCreator<ThunkAction<Promise<Action>, IReduxState, void, Action<any>>> = (callback?: () => void) => {
  return async (dispatch): Promise<Action> => {
    try {
      const { data } = await axiosInstance.get('/referal/open-positions');

      return dispatch({ type: dataTypes.setPositions, positions: data.openPositions || [] });
    } catch (e) {
      return dispatch({ type: dataTypes.setPositions, positions: [] });
    } finally {
      if (typeof callback === 'function') {
        setTimeout(() => callback(), 1000);
      }
    }
  };
};

export const getPositionUrl: ActionCreator<ThunkAction<Promise<Action>, IReduxState, void, Action<any>>> = (id: number) => {
  return async (dispatch): Promise<Action> => {
    try {
      const { data } = await axiosInstance.get(`/referal/referral-link?position=${id}`);

      return dispatch({ type: dataTypes.updatePosition, id, payload: { url: data } });
    } catch (e) {
      return dispatch({ type: dataTypes.updatePosition, id, payload: {} });
    }
  };
};

export const getRedeemData: ActionCreator<ThunkAction<Promise<Action>, IReduxState, void, Action<any>>> = (callback?: () => void) => {
  return async (dispatch): Promise<Action> => {
    try {
      const { data } = await axiosInstance.get('/reward');
      const { data: rate } = await axiosInstance.get('/reward/rate');

      data.rate = rate;

      return dispatch({ type: dataTypes.setRedeem, redeem: data });
    } catch (e) {
      return dispatch({ type: dataTypes.setRedeem, redeem: {} });
    } finally {
      if (typeof callback === 'function') {
        setTimeout(() => callback(), 1000);
      }
    }
  };
};