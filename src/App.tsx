import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { Text, View } from 'react-native';
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
}

class App extends PureComponent<IProps> {
  public componentDidMount(): void {
    SplashScreen.hide();

    setTimeout(() => this.props.setIsLoggedIn(), 500);
  }

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
            openDrawerOffset={0.23}
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
    menuOpened: settings.menuOpened
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setIsLoggedIn: () => dispatch(setIsLoggedIn()),
    setMenuOpened: (menuOpened: boolean) => dispatch(setMenuOpened(menuOpened))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);