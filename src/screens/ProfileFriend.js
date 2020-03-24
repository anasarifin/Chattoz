import React, {useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TextInput,
  Button,
} from 'react-native';
// import {Input, Button} from 'react-native-elements';
import {StackActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Feather';
import {ActionSheet} from 'native-base';

import {
  Root,
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

const imgUrl = 'http://100.24.32.116:9999/public/img/';

const Profile = props => {
  const user = props.route.params.data;

  return (
    <SafeAreaView>
      <View style={styles.headerCon}>
        <View style={styles.profilePictCon}>
          <Image
            source={require('../img/profile.png')}
            style={styles.profilePictDefault}
          />
          <Image
            style={styles.profilePict}
            source={{uri: imgUrl + user.image}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.gender}>
          <MaterialComIcons
            size={40}
            name={user.gender === 0 ? 'gender-male' : 'gender-female'}
            color={'white'}
          />
        </View>
        <Text style={styles.profileName}>{user.name}</Text>
      </View>
      <View style={styles.bodyCon}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          {user.email ? (
            <View style={styles.body}>
              <MaterialIcons size={30} name={'email'} color={'white'} />
              <Text style={styles.text}>{user.email}</Text>
            </View>
          ) : (
            <></>
          )}
          {user.phone ? (
            <View style={styles.body}>
              <MaterialIcons size={30} name={'phone'} color={'white'} />
              <Text style={styles.text}>{user.phone}</Text>
            </View>
          ) : (
            <></>
          )}
          {user.birth.slice(0, 10) !== '0000-00-00' ? (
            <View style={styles.body}>
              <MaterialIcons size={30} name={'date-range'} color={'white'} />
              <Text style={styles.text}>{user.birth.slice(0, 10)}</Text>
            </View>
          ) : (
            <></>
          )}
          {user.address ? (
            <View style={styles.body}>
              <Fontisto size={30} name={'home'} color={'white'} />
              <Text style={styles.text}>{user.address}</Text>
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerCon: {
    width: '100%',
    height: '45%',
    backgroundColor: 'rgba(33,150,243,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePictCon: {
    borderRadius: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    marginBottom: 20,
  },
  profilePictDefault: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  profilePict: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    position: 'absolute',
  },
  profileName: {
    fontSize: RFPercentage(5),
    color: 'white',
  },
  setting: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  gender: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  bodyCon: {
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'rgba(33,150,243,1)',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
  },
  text: {
    marginLeft: 15,
    fontSize: RFPercentage(2.5),
    color: 'white',
  },
  modalCon: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Profile;
