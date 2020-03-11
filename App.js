import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/navigators/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import {decode, encode} from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import {getUser} from './src/redux/actions/user';

const Stack = createStackNavigator();
const url = 'http://192.168.1.135:8888/api/v1/users/';

const App = props => {
  if (!global.btoa) {
    global.btoa = encode;
  }
  if (!global.atob) {
    global.atob = decode;
  }

  const [login, setLogin] = useState('login');
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  const checkLogin = async () => {
    if (await AsyncStorage.getItem('token')) {
      Axios.get(url + 'yuna').then(resolve => {
        dispatch(getUser(resolve.data[0]));
        setLogin('home');
        setReady(true);
      });
    } else {
      setReady(true);
    }
  };

  useEffect(() => checkLogin(), []);

  return (
    <>
      {ready ? (
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName={login}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
