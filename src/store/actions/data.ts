import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { axiosInstance, getIsoDate, IReferalPositions } from '../../utils';
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
      const { data } = await axiosInstance.post('/questions', { zonedDateTime: getIsoDate(new Date()) });

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
      let openPositions = data.openPositions;

      openPositions = await Promise.all(openPositions.map(async (el: IReferalPositions) => {
        try {
          const { data: url } = await axiosInstance.get(`/referal/referral-link?position=${el.id}`);
          el.url = url;

          return el;
        } catch (e) {
          return el;
        }
      }));

      return dispatch({ type: dataTypes.setPositions, positions: openPositions || [] });
    } catch (e) {
      return dispatch({ type: dataTypes.setPositions, positions: [] });
    } finally {
      if (typeof callback === 'function') {
        setTimeout(() => callback(), 1000);
      }
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

export const cleanupData = () => {
  return {
    type: dataTypes.cleanupData
  };
};