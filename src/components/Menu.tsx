import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { eventEmitter, tokenService } from '../services';
import { setIsLoggedIn, setMenuOpened, setModalConfigs } from '../store/actions';
import { IReduxState } from '../store/store';
import { globalStyles, IModalConfigs, isIphoneX } from '../utils';
import { emitterEvents } from '../utils/constants';

interface IProps {
  readonly setMenuOpened: (menuOpened: boolean) => void;
  readonly setIsLoggedIn: () => void;
  readonly routeName: string;
  readonly prevRoute: string;
  readonly setModalConfigs: (config: IModalConfigs) => void;
}

class Menu extends PureComponent<IProps> {
  private readonly menu = [
    {
      id: 1,
      title: 'menu_profile',
      image: require('../assets/images/icons/Menu_profile.png'),
      action: () => this.onMenuItemPress('profile_initial'),
      route: 'profile_initial'
    }, {
      id: 2,
      title: 'menu_feedback',
      image: require('../assets/images/icons/Menu_feedback.png'),
      style: { marginTop: 27.5 },
      action: () => this.onMenuItemPress('feedback'),
      route: 'feedback'
    },
    {
      id: 3,
      title: 'menu_logout',
      image: require('../assets/images/icons/Menu_logout.png'),
      style: styles.logoutItem,
      action: () => this.onLogoutPress()
    }
  ];

  public componentDidMount(): void {
    eventEmitter.on(emitterEvents.on_logout_confirm_modal_close, this.onLogoutModalClose);
  }

  public componentWillUnmount(): void {
    eventEmitter.removeEventListener(emitterEvents.on_logout_confirm_modal_close, this.onLogoutModalClose);
  }

  private onLogoutModalClose = () => {
    setTimeout(
      async () => {
        Actions.reset('signup_email_pass');
        await tokenService.removeToken();
        this.props.setIsLoggedIn();
      },
      300
    );
  };

  private onHeaderButtonPress = () => {
    this.props.setMenuOpened(false);
  };

  private onMenuItemPress = (route: string) => {
    this.props.setMenuOpened(false);
    if (route === this.props.prevRoute) {
      setTimeout(Actions.pop, 500);

      return;
    }
    setTimeout(() => Actions.push(route), 500);
  };

  private onLogoutPress = () => {
    this.props.setMenuOpened(false);
    setTimeout(
      () => {
        this.props.setModalConfigs({
          isVisible: true,
          title: 'menu_logout',
          message: 'menu_logout_confirm',
          icon: 'logout',
          confirm: true,
          event: emitterEvents.on_logout_confirm_modal_close
        });
      },
      500);
  };

  public render() {
    const { routeName } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, position: 'relative' }}>
          <View style={styles.header}>
            <Button transparent={true} onPress={this.onHeaderButtonPress}>
              <Image source={require('../assets/images/icons/menu_opened.png')}/>
            </Button>
            <Text style={styles.title}>
              <FormattedMessage id={'menu_title'}/>
            </Text>
          </View>
          <View style={styles.items}>
            {this.menu.map(item => (
              <Button key={item.id} style={[styles.button, item.style]} transparent={true} onPress={item.action} disabled={routeName === item.route}>
                <View style={styles.item}>
                  <Image source={item.image}/>
                  <Text style={styles.item_title}><FormattedMessage id={item.title}/></Text>
                </View>
                <View style={styles.separator}/>
              </Button>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: globalStyles.colors.gray,
      flex: 1,
      paddingLeft: 32,
      paddingRight: 32,
      paddingTop: 25,
      paddingBottom: 32,
      marginTop: Platform.select({ ios: isIphoneX() ? 48 : 28, android: 8 }),
      marginBottom: isIphoneX() ? 26 : 16,
      borderRadius: 10,
      shadowColor: globalStyles.colors.middleGray,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowRadius: 3,
      shadowOpacity: 1
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      ...globalStyles.fonts.regular,
      fontWeight: '500',
      lineHeight: 25,
      letterSpacing: 0.38,
      color: globalStyles.colors.purple,
      marginLeft: 8
    },
    items: {
      flex: 1,
      marginTop: 59
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    item_title: {
      marginLeft: 8,
      fontSize: 17,
      ...globalStyles.fonts.regular,
      lineHeight: 22,
      letterSpacing: -0.41,
      color: globalStyles.colors.purple
    },
    button: {
      height: 'auto',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    separator: {
      width: '100%',
      height: 1,
      backgroundColor: 'rgba(119, 20, 161, 0.15)',
      marginTop: 10.5,
    },
    logoutItem: { position: 'absolute', bottom: 0, left: 0, right: 0 }
  }
);

const mapStateToProps = ({ router }: IReduxState) => {
  return {
    routeName: router && router.routeName ? router.routeName : '',
    prevRoute: router && router.prevRoute ? router.prevRoute : ''
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setMenuOpened: (menuOpened: boolean) => dispatch(setMenuOpened(menuOpened)),
    setIsLoggedIn: () => dispatch(setIsLoggedIn()),
    setModalConfigs: (config: IModalConfigs) => dispatch(setModalConfigs(config)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);