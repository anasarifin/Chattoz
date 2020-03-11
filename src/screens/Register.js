import React, {useState} from 'react';
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
  ToastAndroid,
} from 'react-native';
import Axios from 'axios';
import {StackActions} from '@react-navigation/native';
import app from '../configs/firebase';
// import AsyncStorage from '@react-native-community/async-storage';

const url = 'http://192.168.1.135:8888/api/v1/register';

const Register = props => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState('');

  const register = () => {
    const regex = /[a-z0-9]/gi;
    // console.log(regex.test(this.state.username));
    if (
      username &&
      username.length >= 4 &&
      username.length <= 12 &&
      regex.test(username)
    ) {
      if (password && password.length >= 6 && regex.test(password)) {
        if (password === rePassword) {
          setLoading(true);
          setWarning(null);
          Axios.post(url, {username: username, password: password})
            .then(resolve => {
              setLoading(false);
              if (resolve.data.insertId) {
                ToastAndroid.show('Register success!', ToastAndroid.SHORT);
                props.navigation.navigate('login');
              } else if (resolve.data.warning) {
                setWarning(resolve.data.warning);
              }
            })
            .catch(reject => console.log(reject));
        } else {
          setWarning('Re-type password must same!');
        }
      } else {
        setWarning(
          'Password must contain min 6 character and not include special char!',
        );
      }
    } else {
      setWarning(
        'Username must contain 4 - 12 character and not include special char!',
      );
    }
  };

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
          onChange={e => setEmail(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="rgba(0,0,0,.5)"
          onChange={e => setPassword(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Re-type Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(0,0,0,.5)"
          onChange={e => setRePassword(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={() => register()}>
          <Text style={styles.loginButton}>Register</Text>
        </TouchableOpacity>
        <ActivityIndicator
          style={loading ? styles.loadingOn : styles.loading}
          color="rgba(30,90,255,.7)"
          size="large"
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity>
          <Text
            style={styles.registerButton}
            onPress={() => props.navigation.navigate('login')}>
            Login
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

export default Register;
