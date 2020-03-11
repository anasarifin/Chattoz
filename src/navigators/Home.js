import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chats from './Chats';
import Maps from '../screens/Maps';
import Profile from '../screens/Profile';
import ProfileMe from '../screens/ProfileMe';
import Live from '../screens/Live';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createBottomTabNavigator();

const Home = () => {
  return (
    // <View>
    //   <Text>Yes</Text>
    // </View>
    <Stack.Navigator
      headerMode="none"
      initialRouteName="chats"
      tabBarOptions={{
        showLabel: false,
        // labelPosition: 'beside-icon',
        style: {marginBottom: -24},
        inactiveBackgroundColor: 'rgba(25,118,210,1)',
        activeBackgroundColor: 'rgba(25,118,210,1)',
      }}>
      <Stack.Screen
        name="maps"
        component={Maps}
        options={{
          title: 'Maps',
          tabBarIcon: () => (
            <View>
              <FontAwesome size={25} name={'map-marker-alt'} color={'white'} />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="chats"
        component={Chats}
        options={{
          title: 'Chats',
          tabBarIcon: () => (
            <View>
              <MaterialIcons
                size={25}
                name={'message-reply-text'}
                color={'white'}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: () => (
            <View>
              <Ionicons size={25} name={'md-contact'} color={'white'} />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="profileMe"
        component={ProfileMe}
        options={{
          title: 'Live',
          tabBarIcon: () => (
            <View>
              <Ionicons size={25} name={'md-contact'} color={'white'} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

// const styles = StyleSheet.create({
//   icon: {
//     color: 'white',
//   },
// });

export default Home;
