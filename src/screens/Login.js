import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import Axios from 'axios';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {getUser} from '../redux/actions/user';

const url = 'http://192.168.1.135:8888/api/v1/login';
const urlUser = 'http://192.168.1.135:8888/api/v1/users/';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('This is warning!');
  const [loading, setLoading] = useState('');
  const dispatch = useDispatch();

  const login = () => {
    if (!username) {
      setWarning('Username is empty !');
      return false;
    }
    if (!password) {
      setWarning('Password is empty !');
      return false;
    }
    Axios.post(url, {
      username: username,
      password: password,
    })
      .then(async resolve => {
        if (resolve.data.token) {
          AsyncStorage.setItem('token', resolve.data.token);
          Axios.get(urlUser + username).then(resolve2 => {
            dispatch(getUser(resolve2.data[0]));
            props.navigation.dispatch(
              StackActions.replace('home', {username: username}),
            );
          });
        } else {
          setWarning(resolve.data.warning);
        }
      })
      .catch(reject => {
        console.log(reject);
      });
  };

  useEffect(() => {
    if (props.route.params) {
      BackHandler.addEventListener('hardwareBackPress', e => false);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,.3)" />
      <View style={styles.logoCon}>
        {/* <Image source={require('../images/bar-logo.png')} style={styles.logo} /> */}
        <Text>LiveChat App</Text>
      </View>
      <View style={styles.textCon}>
        <Text style={styles.warning}>{warning}</Text>

        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="rgba(0,0,0,.5)"
          onChange={e => setUsername(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(0,0,0,.5)"
          onChange={e => setPassword(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={() => login()}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
        {/* <ActivityIndicator
          style={this.state.loading ? styles.loadingOn : styles.loading}
          color="rgba(30,90,255,.7)"
          size="large"
        /> */}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text
            style={styles.registerButton}
            onPress={() => props.navigation.navigate('register')}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCon: {
    marginTop: -60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCon: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -200,
  },
  logo: {
    width: 170,
    height: 170,
    marginTop: -100,
    marginRight: -12,
  },
  inputText: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,.5)',
    width: 350,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  loginButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(30,90,255,.7)',
    width: 350,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 45,
    height: 45,
    color: 'white',
  },
  warning: {
    marginTop: -40,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    width: 380,
    marginBottom: 10,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  footerText: {
    fontSize: 20,
  },
  registerButton: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    position: 'absolute',
    bottom: 40,
    opacity: 0,
  },
  loadingOn: {
    position: 'absolute',
    bottom: 40,
    opacity: 1,
  },
});

export default Login;
