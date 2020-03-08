import React, {useCallback, useContext, useState, useEffect} from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import app from '../configs/firebase';
import 'firebase/firestore';
import {AuthContext} from '../configs/auth';
import firebase from 'firebase';

const Live = () => {
  const db = app.firestore();
  const unsubscribe = () => {
    db.collection('users')
      .where('test', '==', 'true')
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
    <View>
      <TouchableOpacity onPress={() => unsubscribe()}>
        <Text>This</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => add()}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Live;
