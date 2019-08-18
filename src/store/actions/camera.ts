import { cameraTypes } from '../types';

export const setCameraStatus = (isActive: boolean) => {
  return {
    type: cameraTypes.setCameraStatus,
    isActive
  };
};

export const setActiveQuestionId = (activeQuestionId: null | number) => {
  return {
    type: cameraTypes.setActiveQuestionId,
    activeQuestionId
  };
};