/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Redux = () => {
  return (
    <Provider store={store}>
      {/* <SafeAreaProvider> */}
      <App />
      {/* </SafeAreaProvider> */}
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Redux);
