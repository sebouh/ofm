import React, { PureComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ConnectedRouter } from './components';
import { IReduxState } from './store/store';
import { translationMessages } from './utils';

interface IProps {
  readonly locale: string;
}

class App extends PureComponent<IProps> {
  public render() {
    const { locale } = this.props;

    return (
      <IntlProvider locale={locale} textComponent={Text} messages={translationMessages[locale]}>
        <View style={{ flex: 1 }}>
          <ConnectedRouter/>
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

export default connect(mapStateToProps)(App);