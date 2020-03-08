import React, {useCallback, useContext, useState, useEffect} from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import app from '../configs/firebase';
import 'firebase/firestore';
import {AuthContext} from '../configs/auth';
import firebase from 'firebase';
import {SafeAreaView} from 'react-native-safe-area-context';

const Live = () => {
  const db = app.firestore();
  const unsubscribe = () => {
    db.collection('chats')
      .doc('yuna|steve')
      .collection('chat')
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => console.log(doc.data()));
      });
  };
  const add = () => {
    console.log('add ok');
    db.collection('users')
      .add({
        name: 'steve',
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then(resolve => console.log(resolve))
      .catch(reject => console.log(reject));
  };
  //   const unsubscribe = db.collection('users').onSnapshot(async snapshot => {
  //     const userData = [];
  //     await snapshot.forEach(
  //       doc => console.log(doc),
  //       //   userData.push({...doc.data(), index: doc.id}),
  //     );
  //   });
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => unsubscribe()}>
        <Text>This</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => add()}>
        <Text>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Live;
