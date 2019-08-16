import { IModalConfigs } from '../../utils';
import { settingTypes } from '../types';

export const setModalConfigs = (configs: IModalConfigs) => {
  return {
    type: settingTypes.setModalConfigs,
    ...configs
  };
};

export const closeModal = () => {
  return {
    type: settingTypes.closeModal
  };
};