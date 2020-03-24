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
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Axios from 'axios';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {getUser} from '../redux/actions/user';
import {getFriend} from '../redux/actions/user';
import app from '../configs/firebase';

const url = 'http://100.24.32.116:9999/api/v1/login';
const urlUser = 'http://100.24.32.116:9999/api/v1/users/';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState('');
  const [list, setList] = useState(false);
  const dispatch = useDispatch();

  const getFriendList = user => {
    app
      .firestore()
      .collection('users')
      .doc(user)
      .collection('friends')
      .onSnapshot(snapshot => {
        const source = [];
        snapshot.forEach(doc => {
          if (doc) {
            source.push(doc.id);
          }
        });
        if (source.length >= 0) {
          dispatch(getFriend(source));
          setLoading(false);
          props.navigation.dispatch(
            StackActions.replace('home', {username: username}),
          );
        }
      });
  };

  const login = async () => {
    setWarning('');
    if (!username) {
      setWarning('Username is empty !');
      return false;
    }
    if (!password) {
      setWarning('Password is empty !');
      return false;
    }
    setLoading(true);
    Axios.post(url, {
      username: username,
      password: password,
    })
      .then(async resolve => {
        if (resolve.data.token) {
          AsyncStorage.setItem('token', resolve.data.token);
          Axios.get(urlUser + username).then(async resolve2 => {
            await dispatch(getUser(resolve2.data[0]));
            getFriendList(username);
          });
        } else {
          setWarning(resolve.data.warning);
          setLoading(false);
        }
      })
      .catch(reject => {
        console.log(reject);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (props.route.params) {
      BackHandler.addEventListener('hardwareBackPress', e => false);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={true} />
      <View style={styles.logoCon}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
      </View>
      <KeyboardAvoidingView style={styles.textCon}>
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
        <TouchableOpacity onPress={() => login()} style={{width: '100%'}}>
          <View style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.login}>Login</Text>
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.warning}>{warning}</Text>
        {/* <ActivityIndicator
          style={this.state.loading ? styles.loadingOn : styles.loading}
          color="rgba(30,90,255,.7)"
          size="large"
        /> */}
      </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(33,150,150,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCon: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -150,
  },
  logo: {
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').width / 1.2,
  },
  inputText: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,.5)',
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: RFPercentage(2.5),
    textAlign: 'center',
  },
  loginCon: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    borderRadius: 20,
    backgroundColor: '#00695c',
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
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: 'white',
    width: 380,
    marginTop: 10,
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

export default Login;
