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
} from 'react-native';
import Axios from 'axios';
import {StackActions} from '@react-navigation/native';
import app from '../configs/firebase';
// import AsyncStorage from '@react-native-community/async-storage';

const url = 'http://100.24.32.116:9999/api/v1/login';

const Register = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('This is warning!');
  const [loading, setLoading] = useState('');

  const register = () => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        if (app.auth().currentUser != null) {
          app
            .auth()
            .currentUser.updateProfile({
              displayName: name,
            })
            .then(resolve => console.log(resolve));
        }
      });
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
          placeholder="Email"
          placeholderTextColor="rgba(0,0,0,.5)"
          onChange={e => setEmail(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="rgba(0,0,0,.5)"
          onChange={e => setName(e.nativeEvent.text)}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(0,0,0,.5)"
          onChange={e => setPassword(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={() => register()}>
          <Text style={styles.loginButton}>Register</Text>
        </TouchableOpacity>
        {/* <ActivityIndicator
          style={this.state.loading ? styles.loadingOn : styles.loading}
          color="rgba(30,90,255,.7)"
          size="large"
        /> */}
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
