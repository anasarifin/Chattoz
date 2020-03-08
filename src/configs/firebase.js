import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCd4pTv8crt1fIpLtrMmY5IBx17mYgmBQs',
  authDomain: 'livechat-ee027.firebaseapp.com',
  databaseURL: 'https://livechat-ee027.firebaseio.com',
  projectId: 'livechat-ee027',
  storageBucket: 'livechat-ee027.appspot.com',
  messagingSenderId: '214340181989',
  appId: '1:214340181989:web:3b815c1ab9a016d9d7990c',
};
const app = firebase.initializeApp(firebaseConfig);
export default app;
