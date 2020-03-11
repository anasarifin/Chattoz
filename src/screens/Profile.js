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

const url = 'http://100.24.32.116:9999/api/v1/products';

const Profile = props => {
  const [dummy, setDummy] = useState({
    name: 'xxxxx',
    email: 'xxxx@email.com',
    phone: '0193209209',
    birth: '12-12-12',
    address: 'xxxxxxxxxxxxxxx',
    gender: 'xxxxx',
  });
  const userMe = useSelector(state => state.user.user);
  const user = props.route.params ? props.route.params.data : userMe;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [birth, setBirth] = useState(user.birth);
  const [gender, setGender] = useState(user.gender);
  const [location, setLocation] = useState('');
  const [modal, setModal] = useState(false);

  const postData = () => {
    // const formData = new FormData();
    // formData.append('name', this.state.name);
    // formData.append('description', this.state.description);
    // formData.append('price', this.state.price);
    // formData.append('stock', this.state.stock);
    // formData.append('image', {
    //   uri: this.state.image.uri,
    //   type: this.state.image.type,
    //   name: this.state.image.fileName,
    // });
    // formData.append('category_id', this.state.category);
    // if (
    //   !this.state.name ||
    //   !this.state.description ||
    //   !this.state.price ||
    //   !this.state.stock
    // ) {
    //   ToastAndroid.show('Adding failed!', ToastAndroid.SHORT);
    // }
    Axios.post(url, formData, {
      headers: {
        usertoken: AsyncStorage.getItem('token'),
      },
    })
      .then(() => {
        // this.props.dispatch(
        //   products('http://100.24.32.116:9999/api/v1/products?page=1'),
        // );
        ToastAndroid.show('Adding success!', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
        this.setState({
          name: '',
          description: '',
          price: '',
          stock: '',
          category: 0,
          image: {uri: null, type: null, fileName: null},
        });
      })
      .catch(reject => {
        ToastAndroid.show('Adding failed!', ToastAndroid.SHORT);
        console.log(reject);
      });
  };

  const picker = async () => {
    const options = {
      title: 'Select Image',
      takePhotoButtonTitle: 'Take photo from camera',
      chooseFromLibraryButtonTitle: 'Choose photo from gallery',
    };

    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response.uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          image: response,
        });
      }
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.headerCon}>
        <Image
          style={styles.profilePict}
          source={require('../img/profile.png')}
        />
        <Text style={styles.profileName}>{user.name}</Text>

        <View style={styles.setting}>
          <Root>
            <MaterialComIcons
              size={40}
              name={'settings'}
              color={'white'}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: ['Edit Profile', 'Logout'],
                    // title: 'Testing ActionSheet',
                  },
                  buttonIndex => {
                    if (buttonIndex === 0) {
                      console.log('satu');
                    } else {
                      AsyncStorage.removeItem('token');
                      props.navigation.navigate('login');
                    }
                  },
                )
              }
            />
          </Root>
        </View>
        {/* <MaterialComIcons
          style={styles.setting}
          size={36}
          name={'settings'}
          color={'white'}
          onPress={() =>
            ActionSheet.show(
              {
                options: ['Edit Profile', 'Logout'],
                cancelButtonIndex: 1,
                destructiveButtonIndex: 1,
                title: 'Testing ActionSheet',
              },
              buttonIndex => {
                console.log(buttonIndex);
              },
            )
          }
        /> */}
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
  profilePict: {
    borderRadius: 100,
    width: 150,
    height: 150,
    marginBottom: 20,
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
