import React, {useCallback, useContext, useState, useEffect} from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import app from '../configs/firebase';
import 'firebase/firestore';
import {AuthContext} from '../configs/auth';

const Live = () => {
  const db = app.firestore();
  const unsubscribe = () => {
    db.collection('users').onSnapshot(snapshot => {
      snapshot.forEach(doc => console.log(doc.data()));
    });
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
    </View>
  );
};

export default Live;
