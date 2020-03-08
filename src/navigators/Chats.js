import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../screens/ChatList';
import ChatMain from '../screens/ChatMain';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => console.log('OK!!!'), []);

  return (
    <Stack.Navigator
      headerMode="screen"
      mode="modal"
      initialRouteName="chat-list">
      <Stack.Screen
        name="chat-list"
        component={ChatList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="chat-main"
        component={ChatMain}
        options={{headerTitle: props => <Text>shit man</Text>}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
