import axios from 'axios';
import { Dimensions, Platform } from 'react-native';
import config from '../config';

export * from './styles';
export * from './typings';
export * from './messages';

export const axiosInstance = axios.create(
  {
    baseURL: config.api,
    timeout: 60000
  }
);

export const setAxiosAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const isIphoneX = () => {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;

  const XSMAX_WIDTH = 414;
  const XSMAX_HEIGHT = 896;

  const { height, width } = Dimensions.get('window');

  return width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT;
};

export const getStatusBarHeight = (): number => {
  let isIPhoneX = false;

  if (Platform.OS === 'ios') {
    isIPhoneX = isIphoneX();
  }

  return Platform.select(
    {
      ios: isIPhoneX ? 44 : 20,
      android: 0,
      default: 0
    }
  );
};

export const validateEmail = (email: string) => {
  // tslint:disable-next-line
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const getDateDiff = (until: string) => {
  const today = new Date();

  const parsedUntil = until.split(':');

  const endDate = new Date();
  endDate.setHours(Number(parsedUntil[0]));
  endDate.setMinutes(Number(parsedUntil[1]));
  endDate.setSeconds(Number(parsedUntil[2]));

  const diffMs = (endDate.getTime() - today.getTime());
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

  const minutes = diffMins < 10 ? `0${diffMins}` : diffMins;

  if (diffHrs <= 0 && diffMins <= 0) {
    return;
  }

  return `${diffHrs}:${minutes}`;
};