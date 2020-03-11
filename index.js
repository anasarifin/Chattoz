/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {MenuProvider} from 'react-native-popup-menu';

const Redux = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <App />
      </MenuProvider>
    </Provider>
  );
};

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Redux);
