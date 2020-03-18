import React, {useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  Button,
} from 'react-native';
// import {Input, Button} from 'react-native-elements';
import {StackActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
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

const imgUrl = 'http://100.24.32.116:9999/public/img/';

const Profile = props => {
  const userMe = useSelector(state => state.user.user);
  const user = props.route.params.data;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [birth, setBirth] = useState(user.birth);
  const [gender, setGender] = useState(user.gender);
  const [location, setLocation] = useState('');
  const [modal, setModal] = useState(false);

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
          />
        </View>
        <Text style={styles.profileName}>{user.name}</Text>
      </View>
      <View style={styles.bodyCon}>
        <View style={styles.body}>
          <MaterialIcons size={30} name={'email'} color={'black'} />
          <Text style={styles.text}>{user.email}</Text>
        </View>
        <View style={styles.body}>
          <MaterialIcons size={30} name={'phone'} color={'black'} />
          <Text style={styles.text}>{user.phone}</Text>
        </View>
        <View style={styles.body}>
          <MaterialComIcons
            size={30}
            name={user.gender === 0 ? 'gender-male' : 'gender-female'}
            color={'black'}
          />
          <Text style={styles.text}>
            {user.gender === 0 ? 'Male' : 'Female'}
          </Text>
        </View>
        <View style={styles.body}>
          <MaterialIcons size={30} name={'date-range'} color={'black'} />
          <Text style={styles.text}>{user.birth.slice(0, 10)}</Text>
        </View>
        <View style={styles.body}>
          <Fontisto size={30} name={'map-pin'} color={'black'} />
          <Text style={styles.text}>{user.address}</Text>
        </View>
      </View>
      {/* <Button
        title="Change"
        onPress={() => console.log(user)}
      /> */}
      {/* <Button
        title="Logout"
        onPress={() => {
          AsyncStorage.removeItem('token');
          props.navigation.navigate('login', {noBack: true});
        }}
      /> */}
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
    borderRadius: 100,
    width: 150,
    height: 150,
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
    fontSize: 40,
    color: 'white',
  },
  setting: {
    position: 'absolute',
    top: 15,
    right: 15,
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
  },
  text: {
    marginLeft: 15,
    fontSize: 20,
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
