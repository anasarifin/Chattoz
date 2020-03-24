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
import OneSignal from 'react-native-onesignal';

class OneSignalClass extends React.Component {
  constructor(properties) {
    super(properties);
    OneSignal.init('454887cc-2a24-4389-9592-81f8e530480a', {
      kOSSettingsKeyAutoPrompt: true,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return <App />;
  }
}

const Redux = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <OneSignalClass />
      </MenuProvider>
    </Provider>
  );
};

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Redux);
