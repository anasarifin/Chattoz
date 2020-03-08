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
    <Stack.Navigator headerMode="none" initialRouteName="chat-list">
      <Stack.Screen name="chat-list" component={ChatList} />
      <Stack.Screen name="chat-main" component={ChatMain} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
