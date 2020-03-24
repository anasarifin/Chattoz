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
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import {getUser, getFriend} from './src/redux/actions/user';
import {setCoordinate} from './src/redux/actions/location';
import jwt_decode from 'jwt-decode';
import firebase from 'firebase';
import app from './src/configs/firebase';

const Stack = createStackNavigator();
const url = 'http://100.24.32.116:9999/api/v1/users/';

const App = props => {
  if (!global.btoa) {
    global.btoa = encode;
  }
  if (!global.atob) {
    global.atob = decode;
  }

  const [login, setLogin] = useState('login');
  const [ready, setReady] = useState(false);
  const location = useSelector(state => state.location.coordinate);
  const dispatch = useDispatch();

  const getFriendList = user => {
    app
      .firestore()
      .collection('users')
      .doc(user)
      .collection('friends')
      .onSnapshot(snapshot => {
        const source = [];
        snapshot.forEach(doc => {
          if (doc) {
            source.push(doc.id);
          }
        });
        if (source.length > 0) {
          dispatch(getFriend(source));
          setReady(true);
        } else {
          setReady(true);
        }
      });
  };

  // const getChatList = user => {
  //   app
  //     .firestore()
  //     .collection('users')
  //     .doc(user)
  //     .collection('chats')
  //     .get()
  //     .then(async snapshot => {
  //       const source = [];
  //       await snapshot.forEach(doc => {
  //         if (doc) {
  //           source.push({username: doc.id, ...doc.data()});
  //         }
  //       });
  //       if (source.length > 0) {
  //         dispatch(getChat(source));
  //         setReady(true);
  //       } else {
  //         setReady(true);
  //       }
  //     });
  // };

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const username = jwt_decode(token).username;
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

  const trackLocation = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const username = jwt_decode(token).username;
      Geolocation.getCurrentPosition(
        position => {
          const newCoordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          if (
            location.latitude !== position.latitude &&
            location.longitude !== position.latitude
          ) {
            dispatch(setCoordinate(newCoordinate));
            app
              .firestore()
              .collection('users')
              .doc(username)
              .update({
                location: new firebase.firestore.GeoPoint(
                  position.coords.latitude,
                  position.coords.longitude,
                ),
              })
              .then(resolve => console.log(resolve))
              .catch(reject => console.log(reject));
          }
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          dispatch(
            setCoordinate({
              latitude: 0,
              longitude: 0,
            }),
          );
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => checkLogin(), []);
  useEffect(() => {
    trackLocation();
    setInterval(() => {
      trackLocation();
    }, 5000);
  }, []);

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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};

export default App;
