import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ConnectedRouter, Modal } from './components';
import { setIsLoggedIn } from './store/actions';
import { IReduxState } from './store/store';
import { translationMessages } from './utils';

interface IProps {
  readonly locale: string;
  readonly setIsLoggedIn: () => void;
}

class App extends PureComponent<IProps> {
  public componentDidMount(): void {
    SplashScreen.hide();

    setTimeout(() => this.props.setIsLoggedIn(), 500);
  }

  public render() {
    const { locale } = this.props;

    return (
      <IntlProvider locale={locale} textComponent={Text} messages={translationMessages[locale]}>
        <View style={{ flex: 1 }}>
          <ConnectedRouter/>
          <Modal/>
        </View>
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ settings }: IReduxState) => {
  return {
    locale: settings.locale
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    setIsLoggedIn: () => dispatch(setIsLoggedIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);