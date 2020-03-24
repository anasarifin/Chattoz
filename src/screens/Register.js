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
  Dimensions,
} from 'react-native';
import Axios from 'axios';
import {StackActions} from '@react-navigation/native';
import app from '../configs/firebase';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
// import AsyncStorage from '@react-native-community/async-storage';

const url = 'http://100.24.32.116:9999/api/v1/register';

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
                props.navigation.navigate('login');
                ToastAndroid.show('Register success!', ToastAndroid.SHORT);
                app
                  .firestore()
                  .collection('users')
                  .doc(username)
                  .set({
                    username: username,
                  });
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
      <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={true} />
      <View style={styles.logoCon}>
        <Image source={require('../img/logo2.png')} style={styles.logo} />
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
          secureTextEntry={true}
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
        <TouchableOpacity onPress={() => register()} style={{width: '100%'}}>
          <View style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.login}>Login</Text>
            )}
          </View>
        </TouchableOpacity>
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
    backgroundColor: '#b39ddb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -200,
  },
  logo: {
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').width / 1.2,
    marginTop: -100,
  },
  inputText: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,.5)',
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: RFPercentage(2.3),
    textAlign: 'center',
  },
  loginCon: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    borderRadius: 20,
    backgroundColor: '#7e57c2',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 45,
  },
  login: {
    fontSize: RFPercentage(2.3),
    color: 'white',
  },
  warning: {
    marginTop: -40,
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: 'white',
    width: 380,
    marginBottom: 10,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  footerText: {
    fontSize: RFPercentage(2.5),
  },
  registerButton: {
    marginLeft: 5,
    fontSize: RFPercentage(2.5),
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
