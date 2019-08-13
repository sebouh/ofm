/**
 * @format
 */
import React from "react";
import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/store/store';

const AppComponent = () => <Provider store={store}><App/></Provider>;

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/en');
}

AppRegistry.registerComponent(appName, () => AppComponent);
