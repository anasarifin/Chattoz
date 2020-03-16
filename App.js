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
import {getUser, getFriend} from './src/redux/actions/user';
import jwt_decode from 'jwt-decode';
import app from './src/configs/firebase';

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

  const getFriendList = user => {
    app
      .firestore()
      .collection('users')
      .doc(user)
      .collection('friends')
      .get()
      .then(async snapshot => {
        const source = [];
        await snapshot.forEach(doc => {
          if (doc) {
            source.push(doc.id);
          }
        });
        if (source.length > 0) {
          dispatch(getFriend(source));
          setReady(true);
        }
      });
  };

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    const username = jwt_decode(token).username;
    if (token) {
      Axios.get(url + username)
        .then(async resolve => {
          getFriendList(username);
          dispatch(getUser(resolve.data[0]));
          setLogin('home');
        })
        .catch(() => {
          setTimeout(() => {
            setLogin('login');
          }, 20000);
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

export default App;
