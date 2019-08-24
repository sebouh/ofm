import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { tokenService } from '../services';
import { setIsLoggedIn } from '../store/actions';
import { IReduxState } from '../store/store';
import { getStatusBarHeight, globalStyles, isIphoneX } from '../utils';

interface IProps {
  readonly routeName: string;
  readonly setIsLoggedIn: () => void;
  readonly replace?: string;
}

class Header extends PureComponent<IProps> {
  private readonly smallHeaderScreens: string[] = ['main_dashboard', 'redeem_initial', 'redeem_confirmation'];
  private readonly showBackButton: string[] = ['sign_in_recover_password', 'redeem_confirmation', 'redeem_initial'];
  private readonly showMenuButton: string[] = ['main_dashboard', 'redeem_initial', 'redeem_confirmation'];

  private onMenuButtonPress = async () => {
    Actions.reset('signup_email_pass');
    await tokenService.removeToken();
    this.props.setIsLoggedIn();
  };

  private onBackPress = () => {
    if (this.props.replace) {
      return Actions.replace(this.props.replace);
    }

    return Actions.pop();
  };

  public render() {
    const { routeName } = this.props;
    const isSmall = this.smallHeaderScreens.includes(routeName);

    return (
      <View style={[styles.container, isSmall && styles.smallContainer]}>
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
      height: isIphoneX() ? 161 : 139
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
      top: getStatusBarHeight() + 34,
      left: 16,
      flexDirection: 'row',
      alignItems: 'center',
      height: 30
    },
    back_button_small: {
      top: getStatusBarHeight() + 34,
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
      top: getStatusBarHeight() + 34,
      left: '50%',
      marginLeft: -89
    },
    smallImage: {
      top: getStatusBarHeight() + 19
    },
    menu_button: {
      position: 'absolute',
      top: getStatusBarHeight() + 23,
      right: 19
    }
  }
);

const mapStateToProps = ({ router }: IReduxState) => {
  return {
    routeName: router && router.routeName ? router.routeName : ''
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setIsLoggedIn: () => dispatch(setIsLoggedIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);