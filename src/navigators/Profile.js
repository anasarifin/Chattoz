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
import ProfileMe from '../screens/ProfileMe';
import ProfileEdit from '../screens/ProfileEdit';
import ProfileFriend from '../screens/ProfileFriend';

const Stack = createStackNavigator();

const Profile = props => {
  useEffect(() => {
    if (props.route.params) {
      console.log(props.route.params.data);
    }
  }, []);

  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      initialRouteName="profile-me">
      <Stack.Screen name="profile-me" component={ProfileMe} />
      <Stack.Screen name="profile-edit" component={ProfileEdit} />
      {/* <Stack.Screen
        name="profile-friend"
        component={ProfileFriend}
        initialParams={{data: props.route.params.data}}
      /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Profile;
