import { Dimensions, Platform } from 'react-native';

export * from './styles';
export * from './typings';
export * from './messages';

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