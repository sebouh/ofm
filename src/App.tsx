import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { AppState, AppStateStatus, Text, View } from 'react-native';
import Drawer from 'react-native-drawer';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ConnectedRouter, Menu, Modal } from './components';
import { setIsLoggedIn, setMenuOpened } from './store/actions';
import { IReduxState } from './store/store';
import { translationMessages } from './utils';

interface IProps {
  readonly locale: string;
  readonly setIsLoggedIn: () => void;
  readonly setMenuOpened: (menuOpened: boolean) => void;
  readonly menuOpened: boolean;
  readonly isLoggedIn: boolean | undefined;
}

class App extends PureComponent<IProps> {
  private interval: number = 0;
  public readonly state = {
    appState: AppState.currentState
  };

  public componentDidMount(): void {
    SplashScreen.hide();

    setTimeout(() => this.props.setIsLoggedIn(), 500);
    AppState.addEventListener('change', this.handleAppStateChange);
    this.interval = setInterval(this.props.setIsLoggedIn, 60000);
  }

  public componentWillUnmount(): void {
    AppState.removeEventListener('change', this.handleAppStateChange);
    clearInterval(this.interval);
  }

  private handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.interval = setInterval(this.props.setIsLoggedIn, 60000);
      this.props.setIsLoggedIn();
    }

    if (!this.state.appState.match(/inactive|background/)) {
      clearInterval(this.interval);
    }

    this.setState({ appState: nextAppState });
  };

  public render() {
    const { locale } = this.props;

    const menu = <Menu/>;

    return (
      <IntlProvider locale={locale} textComponent={Text} messages={translationMessages[locale]}>
        <View style={{ flex: 1 }}>
          <Drawer
            type={'overlay'}
            side={'right'}
            content={menu}
            open={this.props.menuOpened}
            openDrawerOffset={0.2}
            onClose={() => this.props.setMenuOpened(false)}
            acceptTap={true}
          >
            <ConnectedRouter/>
          </Drawer>
          <Modal/>
        </View>
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ settings }: IReduxState) => {
  return {
    locale: settings.locale,
    menuOpened: settings.menuOpened,
    isLoggedIn: settings.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setIsLoggedIn: () => dispatch(setIsLoggedIn()),
    setMenuOpened: (menuOpened: boolean) => dispatch(setMenuOpened(menuOpened))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);