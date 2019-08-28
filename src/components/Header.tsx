import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, LayoutChangeEvent, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { setMenuOpened } from '../store/actions';
import { IReduxState } from '../store/store';
import { getStatusBarHeight, globalStyles, isIphoneX } from '../utils';
import { IS_SMALL_HEIGHT } from '../utils/constants';

interface IProps {
  readonly routeName: string;
  readonly replace?: string;
  readonly setMenuOpened: (menuOpened: boolean) => void;
  readonly onLayout?: (height: number) => void;
  readonly menuOpened: boolean;
}

class Header extends PureComponent<IProps> {
  private readonly smallHeaderScreens = [
    'main_dashboard',
    'redeem_initial',
    'redeem_confirmation',
    'profile_initial',
    'profile_change_pass',
    'feedback'
  ];
  private readonly showBackButton = [
    'sign_in_recover_password',
    'sign_in_confirm_code',
    'redeem_confirmation',
    'redeem_initial',
    'profile_initial',
    'profile_change_pass',
    'feedback'
  ];
  private readonly showMenuButton = [
    'main_dashboard',
    'redeem_initial',
    'redeem_confirmation',
    'profile_initial',
    'profile_change_pass',
    'feedback'
  ];

  private onMenuButtonPress = () => {
    this.props.setMenuOpened(!this.props.menuOpened);
  };

  private onBackPress = () => {
    if (this.props.replace) {
      return Actions.replace(this.props.replace);
    }

    return Actions.pop();
  };

  private onViewLayout = (e: LayoutChangeEvent) => {
    if (typeof this.props.onLayout === 'function') {
      this.props.onLayout(e.nativeEvent.layout.height);
    }
  };

  public render() {
    const { routeName } = this.props;
    const isSmall = this.smallHeaderScreens.includes(routeName);

    return (
      <View style={[styles.container, isSmall && styles.smallContainer]} onLayout={this.onViewLayout}>
        <StatusBar barStyle={'light-content'}/>
        <LinearGradient colors={['#00008b', '#8b008b']} style={styles.gradient}/>
        {this.showBackButton.includes(routeName) ? (
          <Button transparent={true} style={[styles.back_button, isSmall && styles.back_button_small]} onPress={this.onBackPress}>
            <Image source={require('../assets/images/icons/back.png')} style={{ width: 12, height: 20.5 }}/>
            <Text style={styles.back_button_text}><FormattedMessage id={'back_button'}/></Text>
          </Button>
        ) : null}
        <Image style={[styles.image, isSmall && styles.smallImage]} source={require('../assets/images/logo.png')}/>
        {this.showMenuButton.includes(routeName) ? (
          <Button transparent={true} style={styles.menu_button} onPress={this.onMenuButtonPress}>
            <Image source={require('../assets/images/icons/menu.png')} style={{ width: 24, height: 16.5 }}/>
          </Button>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      height: isIphoneX() ? 161 : IS_SMALL_HEIGHT ? 119 : 139
    },
    smallContainer: {
      height: isIphoneX() ? 123 : 101
    },
    gradient: {
      flex: 1,
      opacity: 0.5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    back_button: {
      position: 'absolute',
      top: getStatusBarHeight() + (IS_SMALL_HEIGHT ? 14 : 34),
      left: IS_SMALL_HEIGHT ? 6 : 16,
      flexDirection: 'row',
      alignItems: 'center',
      height: 30
    },
    back_button_small: {
      top: getStatusBarHeight() + (IS_SMALL_HEIGHT ? 14 : 34),
    },
    back_button_text: {
      ...globalStyles.fonts.regular,
      fontSize: 17,
      letterSpacing: -0.41,
      color: globalStyles.colors.white,
      marginLeft: 5
    },
    image: {
      position: 'absolute',
      top: getStatusBarHeight() + (IS_SMALL_HEIGHT ? 14 : 34),
      left: '50%',
      marginLeft: -89,
    },
    smallImage: {
      top: getStatusBarHeight() + (IS_SMALL_HEIGHT ? 10 : 19),
    },
    menu_button: {
      position: 'absolute',
      top: getStatusBarHeight() + (IS_SMALL_HEIGHT ? 13 : 23),
      right: IS_SMALL_HEIGHT ? 9 : 19
    }
  }
);

const mapStateToProps = ({ router, settings }: IReduxState) => {
  return {
    routeName: router && router.routeName ? router.routeName : '',
    menuOpened: settings.menuOpened
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setMenuOpened: (menuOpened: boolean) => dispatch(setMenuOpened(menuOpened))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);